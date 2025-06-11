import { useState, useEffect, useCallback } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import {
  FaBuilding,
  FaUsers,
  FaCalendarCheck,
  FaTable,
  FaSync,
  FaChartPie,
  FaExclamationTriangle,
} from "react-icons/fa"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./Dashboard.css"

// Configure Axios for backend connection
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
})

// Add interceptors for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Sending API request to: ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    console.log(`API response from ${response.config.url}:`, response.data)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`Error response (${error.response.status}):`, error.response.data)
    } else if (error.request) {
      console.error("No response received:", error.request)
    } else {
      console.error("Request setup error:", error.message)
    }
    return Promise.reject(error)
  },
)

const DashBoard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalUsers: 0,
    totalReservations: 0,
    totalTables: 0,
  })
  const [customerDemographics, setCustomerDemographics] = useState([])
  const [cancellationRates, setCancellationRates] = useState([])

  const COLORS = ["#2D3748", "#4A90E2", "#7ED321", "#F5A623", "#E74C3C", "#9B59B6"]

  const calculateLocationDemographics = (reservations) => {
    const locationCounts = {}
    let total = 0

    reservations.forEach((reservation) => {
      const location =
        reservation.location ||
        reservation.customer_location ||
        reservation.restaurant_location ||
        reservation.address ||
        reservation.city ||
        reservation.area ||
        "undefined"

      locationCounts[location] = (locationCounts[location] || 0) + 1
      total++
    })

    const sortedLocations = Object.entries(locationCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([location, count]) => ({
        name: location,
        value: total > 0 ? (count / total) * 100 : 0,
        count: count,
      }))

    return sortedLocations
  }

  // Fetch data from API
  const fetchDashboardData = useCallback(async (showLoadingState = true) => {
    if (showLoadingState) {
      setLoading(true)
    }
    setError(null)

    try {
      console.log("Fetching data from Laravel API...")

      const [usersResponse, restaurantsResponse, reservationsResponse, tablesResponse] = await Promise.allSettled([
        apiClient.get("/reports/user-count"),
        apiClient.get("/restaurants"),
        apiClient.get("/reservations"),
        apiClient.get("/reports/tables"),
      ])

      if (usersResponse.status === "fulfilled") {
        const userData = usersResponse.value.data
        const userCount = userData?.count || userData?.total_users || userData?.user_count || 0
        setStats((prevStats) => ({
          ...prevStats,
          totalUsers: userCount,
        }))
      }

      if (restaurantsResponse.status === "fulfilled") {
        const restaurantData = restaurantsResponse.value.data
        const restaurantCount = Array.isArray(restaurantData)
          ? restaurantData.length
          : restaurantData?.count || restaurantData?.total || 0
        setStats((prevStats) => ({
          ...prevStats,
          totalRestaurants: restaurantCount,
        }))
      }

      if (reservationsResponse.status === "fulfilled") {
        const reservationData = reservationsResponse.value.data
        let reservations = []

        if (Array.isArray(reservationData)) {
          reservations = reservationData
        } else if (reservationData?.data && Array.isArray(reservationData.data)) {
          reservations = reservationData.data
        }

        console.log("Processing reservations for demographics:", reservations)

        setStats((prevStats) => ({
          ...prevStats,
          totalReservations: reservations.length,
        }))

        const demographics = calculateLocationDemographics(reservations)
        console.log("Calculated demographics:", demographics)
        setCustomerDemographics(demographics)

        const uniqueCustomers = new Set(reservations.map((r) => r.email || r.customer_email)).size
        const totalGuests = reservations.reduce((sum, r) => sum + (Number.parseInt(r.party_size) || 0), 0)

        console.log(`Found ${uniqueCustomers} unique customers with ${totalGuests} total guests`)
      }

      if (tablesResponse.status === "fulfilled") {
        const tableData = tablesResponse.value.data
        console.log("Raw table data received:", tableData)

        let tableCount = 0

        if (Array.isArray(tableData)) {
          tableCount = tableData.length
        } else if (tableData && typeof tableData === "object") {
          tableCount =
            tableData.total_tables ||
            tableData.count ||
            tableData.total ||
            tableData.tables_count ||
            (Array.isArray(tableData.data) ? tableData.data.length : 0) ||
            (Array.isArray(tableData.tables) ? tableData.tables.length : 0) ||
            0
        }

        console.log("Calculated table count:", tableCount)

        setStats((prevStats) => ({
          ...prevStats,
          totalTables: tableCount,
        }))
      } else {
        console.error("Failed to fetch tables data:", tablesResponse.reason)
        try {
          const alternativeTablesResponse = await apiClient.get("/tables")
          const altTableData = alternativeTablesResponse.data
          const altTableCount = Array.isArray(altTableData)
            ? altTableData.length
            : altTableData?.total || altTableData?.count || 0

          setStats((prevStats) => ({
            ...prevStats,
            totalTables: altTableCount,
          }))
          console.log("Used alternative endpoint for tables, count:", altTableCount)
        } catch (altError) {
          console.error("Alternative tables endpoint also failed:", altError)
          setStats((prevStats) => ({
            ...prevStats,
            totalTables: 0,
          }))
        }
      }

      setLastUpdated(new Date())
      setLoading(false)
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError(`Failed to load dashboard data: ${err.message}`)
      setLoading(false)
    }
  }, [])

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh((prev) => !prev)
  }

  // Set up auto-refresh interval
  useEffect(() => {
    let intervalId
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchDashboardData(false)
      }, 60000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [autoRefresh, fetchDashboardData])

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  // Format the last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return "Never"
    return new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(lastUpdated)
  }

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div>Loading dashboard data...</div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="text-center" style={{ maxWidth: "600px" }}>
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">
              <FaExclamationTriangle className="me-2" />
              Error loading data
            </h4>
            <p>{error}</p>
            <div className="mt-3">
              <Button variant="primary" onClick={() => fetchDashboardData()}>
                <FaSync className="me-2" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1.5rem" }}>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d3748", margin: 0 }}>
              Restaurant Admin Dashboard & Reporting
            </h1>
            <p className="text-muted mb-0">
              Last updated: {formatLastUpdated()}
              {autoRefresh && <span className="ms-2 badge bg-success">Auto-refresh on</span>}
            </p>
          </Col>
          <Col xs="auto" className="d-flex gap-2">
            <Button
              variant={autoRefresh ? "success" : "outline-secondary"}
              onClick={toggleAutoRefresh}
              title={autoRefresh ? "Disable Auto-refresh" : "Enable Auto-refresh"}
            >
              <FaSync className={autoRefresh ? "fa-spin" : ""} />
            </Button>
            <Button variant="outline-primary" onClick={() => fetchDashboardData()}>
              <FaSync className="me-2" /> Refresh
            </Button>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Link to="/Dashboard/restaurant-management" className="text-decoration-none">
              <Card
                style={{
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Card.Body style={{ padding: "1.5rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Restaurants</div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <FaBuilding style={{ fontSize: "1.25rem", color: "#6b7280", marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                        {stats.totalRestaurants.toLocaleString()}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#4A90E2", fontWeight: "500" }}>
                      Manage Restaurants →
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Link to="/Dashboard/user-management" className="text-decoration-none">
              <Card
                style={{
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Card.Body style={{ padding: "1.5rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Users</div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <FaUsers style={{ fontSize: "1.25rem", color: "#6b7280", marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                        {stats.totalUsers.toLocaleString()}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#4A90E2", fontWeight: "500" }}>Manage Users →</span>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Link to="/Dashboard/reservation-management" className="text-decoration-none">
              <Card
                style={{
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Card.Body style={{ padding: "1.5rem" }}>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Reservations</div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <FaCalendarCheck style={{ fontSize: "1.25rem", color: "#6b7280", marginRight: "0.5rem" }} />
                      <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                        {stats.totalReservations.toLocaleString()}
                      </span>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#4A90E2", fontWeight: "500" }}>
                      Manage Reservations →
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card style={{ border: "none", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <Card.Body style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Total</div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "0.5rem" }}>Tables</div>
                <div className="d-flex align-items-center">
                  <FaTable style={{ fontSize: "1.25rem", color: "#6b7280", marginRight: "0.5rem" }} />
                  <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
                    {stats.totalTables.toLocaleString()}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Customer Demographics Chart */}
        <Row className="mb-4">
          <Col lg={6} md={12} className="mb-4">
            <Card style={{ border: "none", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <Card.Body style={{ padding: "1.5rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1f2937", margin: 0 }}>
                    Customer Demographics by Location
                  </h5>
                  <FaChartPie style={{ color: "#6b7280" }} />
                </div>
                {customerDemographics.length > 0 ? (
                  <Row>
                    <Col md={6}>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={customerDemographics}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {customerDemographics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value, name, props) => [
                              `${Number.parseFloat(value).toFixed(1)}% (${props.payload.count}Reservation)`,
                              "Percentage",
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </Col>
                    <Col md={6}>
                      <div style={{ paddingTop: "1rem" }}>
                        {customerDemographics.map((entry, index) => (
                          <div
                            key={`legend-${index}`}
                            className="d-flex justify-content-between align-items-center mb-2"
                          >
                            <div className="d-flex align-items-center">
                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: COLORS[index % COLORS.length],
                                  marginRight: "0.5rem",
                                }}
                              ></div>
                              <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>{entry.name}</span>
                            </div>
                            <div className="text-end">
                              <span style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1f2937" }}>
                                {Number.parseFloat(entry.value).toFixed(1)}%
                              </span>
                              <br />
                              <small style={{ fontSize: "0.75rem", color: "#6b7280" }}>{entry.count} Reservation</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <div className="text-center text-muted p-4">
                    <p>No location data available</p>
                    <small>Statistics will be calculated based on booking locations</small>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DashBoard
