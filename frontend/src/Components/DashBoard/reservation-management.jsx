import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from "react-bootstrap"
import { FaEdit, FaTrash, FaEye, FaSync, FaArrowLeft, FaCalendarCheck, FaClock } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Configure Axios for backend connection
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
})

const ReservationManagement = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [reservations, setReservations] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("edit") // edit, view
  const [selectedReservation, setSelectedReservation] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    restaurant_id: "",
    reservation_date: "",
    reservation_time: "",
    party_size: "",
    location: "",
    special_requests: "",
    status: "pending",
  })

  useEffect(() => {
    console.log("Reservation Management component mounted")
    apiClient
      .get("/ping")
      .then((response) => console.log("API connection successful:", response))
      .catch((error) => console.error("API connection failed:", error))
  }, [])

  const fetchReservations = async () => {
    setLoading(true)
    try {
      console.log("Attempting to fetch reservations...")
      const response = await apiClient.get("/reservations")
      console.log("Reservations data received:", response.data)
      setReservations(response.data.data || response.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching reservations:", err)
      setError("Failed to load reservations. Please check your API connection.")
      setReservations([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch restaurants for dropdown
  const fetchRestaurants = async () => {
    try {
      const response = await apiClient.get("/restaurants")
      console.log("Restaurants data:", response.data)
      setRestaurants(response.data.data || response.data || [])
    } catch (err) {
      console.error("Error fetching restaurants:", err)
    }
  }

  // Update reservation
  const updateReservation = async () => {
    try {
      const response = await apiClient.put(`/reservations/${selectedReservation.id}`, formData)
      console.log("Reservation updated:", response.data)
      setSuccess("Reservation updated successfully!")
      setShowModal(false)
      resetForm()
      fetchReservations()
    } catch (err) {
      console.error("Error updating reservation:", err)
      setError(err.response?.data?.message || "Failed to update reservation")
    }
  }

  // Delete reservation
  const deleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await apiClient.delete(`/reservations/${id}`)
        setSuccess("Reservation deleted successfully!")
        fetchReservations()
      } catch (err) {
        console.error("Error deleting reservation:", err)
        setError(err.response?.data?.message || "Failed to delete reservation")
      }
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === "edit") {
      updateReservation()
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      customer_name: "",
      email: "",
      phone: "",
      restaurant_id: "",
      reservation_date: "",
      reservation_time: "",
      party_size: "",
      location: "",
      special_requests: "",
      status: "pending",
    })
    setSelectedReservation(null)
  }

  // Open modal for different modes
  const openModal = (mode, reservation) => {
    setModalMode(mode)
    setSelectedReservation(reservation)
    if (reservation) {
      setFormData({
        customer_name: reservation.customer_name || "",
        email: reservation.email || "",
        phone: reservation.phone || "",
        restaurant_id: reservation.restaurant_id || "",
        reservation_date: reservation.reservation_date || "",
        reservation_time: reservation.reservation_time || "",
        party_size: reservation.party_size || "",
        location: reservation.location || "",
        special_requests: reservation.special_requests || "",
        status: reservation.status || "pending",
      })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "success"
      case "pending":
        return "warning"
      case "cancelled":
        return "danger"
      case "completed":
        return "info"
      default:
        return "secondary"
    }
  }

  // Get restaurant name by ID
  const getRestaurantName = (restaurantId) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId)
    return restaurant ? restaurant.name : "Unknown Restaurant"
  }

  useEffect(() => {
    fetchReservations()
    fetchRestaurants()
  }, [])

  // Define available locations
  const availableLocations = ["Indoor", "Outdoor", "Window", "Private Room", "Bar", "Patio"]

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1.5rem" }}>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <div className="d-flex align-items-center">
              <Button variant="outline-secondary" onClick={() => navigate("/")} className="me-3">
                <FaArrowLeft />
              </Button>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d3748", margin: 0 }}>
                  Reservation Management
                </h1>
                <p style={{ color: "#6b7280", margin: 0 }}>Manage all reservations across all restaurants</p>
              </div>
            </div>
          </Col>
          <Col xs="auto" className="d-flex gap-2">
            <Button variant="outline-primary" onClick={fetchReservations}>
              <FaSync className="me-2" />
              Refresh
            </Button>
          </Col>
        </Row>

        {/* Alerts */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        )}

        {/* Reservations Table */}
        <Card style={{ border: "none", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Card.Header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb" }}>
            <h5 style={{ margin: 0, fontWeight: "600" }}>All Reservations ({reservations.length})</h5>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : reservations.length > 0 ? (
              <Table responsive hover className="mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Party Size</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>{reservation.customer_name}</div>
                          <small className="text-muted">{reservation.email}</small>
                        </div>
                      </td>
                      <td>{getRestaurantName(reservation.restaurant_id)}</td>
                      <td>
                        <span className="badge bg-light text-dark">{reservation.location || "undefined"}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaCalendarCheck className="text-primary me-2" />
                          {reservation.reservation_date}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaClock className="text-secondary me-2" />
                          {reservation.reservation_time}
                        </div>
                      </td>
                      <td>{reservation.party_size} guests</td>
                      <td>
                        <Badge bg={getStatusColor(reservation.status)}>{reservation.status}</Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            size="sm"
                            variant="outline-info"
                            onClick={() => openModal("view", reservation)}
                            title="View Details"
                          >
                            <FaEye />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => openModal("edit", reservation)}
                            title="Edit Reservation"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteReservation(reservation.id)}
                            title="Delete Reservation"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center p-4 text-muted">
                <p>No reservations found</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Modal for Edit/View */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {modalMode === "edit" && "Edit Reservation"}
              {modalMode === "view" && "Reservation Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Restaurant *</Form.Label>
                    <Form.Select
                      name="restaurant_id"
                      value={formData.restaurant_id}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    >
                      <option value="">Select Restaurant</option>
                      {restaurants.map((restaurant) => (
                        <option key={restaurant.id} value={restaurant.id}>
                          {restaurant.name} - {restaurant.location}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location *</Form.Label>
                    <Form.Select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    >
                      <option value="">add location</option>
                      {availableLocations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Party Size *</Form.Label>
                    <Form.Select
                      name="party_size"
                      value={formData.party_size}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    >
                      <option value="">Select Party Size</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                        <option key={size} value={size}>
                          {size} guest{size > 1 ? "s" : ""}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Reservation Date *</Form.Label>
                    <Form.Control
                      type="date"
                      name="reservation_date"
                      value={formData.reservation_date}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Reservation Time *</Form.Label>
                    <Form.Control
                      type="time"
                      name="reservation_time"
                      value={formData.reservation_time}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                      <option value="no-show">No Show</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Special Requests</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or notes..."
                  disabled={modalMode === "view"}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {modalMode === "view" ? "Close" : "Cancel"}
            </Button>
            {modalMode !== "view" && (
              <Button variant="primary" onClick={handleSubmit}>
                Update Reservation
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default ReservationManagement
