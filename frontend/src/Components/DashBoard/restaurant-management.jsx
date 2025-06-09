import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from "react-bootstrap"
import { FaEdit, FaTrash, FaEye, FaSync, FaArrowLeft } from "react-icons/fa"
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

const RestaurantManagement = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("edit") // edit, view
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    description: "",
    capacity: "",
    opening_hours: "",
    cuisine_type: "",
    status: "active",
  })

  // Fetch restaurants from backend
  const fetchRestaurants = async () => {
    setLoading(true)
    try {
      const response = await apiClient.get("/restaurants")
      console.log("Restaurants data:", response.data)
      setRestaurants(response.data.data || response.data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching restaurants:", err)
      setError("Failed to load restaurants")
    } finally {
      setLoading(false)
    }
  }

  // Update restaurant
  const updateRestaurant = async () => {
    try {
      const response = await apiClient.put(`/restaurants/${selectedRestaurant.id}`, formData)
      console.log("Restaurant updated:", response.data)
      setSuccess("Restaurant updated successfully!")
      setShowModal(false)
      resetForm()
      fetchRestaurants()
    } catch (err) {
      console.error("Error updating restaurant:", err)
      setError(err.response?.data?.message || "Failed to update restaurant")
    }
  }

  // Delete restaurant
  const deleteRestaurant = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await apiClient.delete(`/restaurants/${id}`)
        setSuccess("Restaurant deleted successfully!")
        fetchRestaurants()
      } catch (err) {
        console.error("Error deleting restaurant:", err)
        setError(err.response?.data?.message || "Failed to delete restaurant")
      }
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === "edit") {
      updateRestaurant()
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      phone: "",
      email: "",
      description: "",
      capacity: "",
      opening_hours: "",
      cuisine_type: "",
      status: "active",
    })
    setSelectedRestaurant(null)
  }

  // Open modal for different modes
  const openModal = (mode, restaurant) => {
    setModalMode(mode)
    setSelectedRestaurant(restaurant)
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        location: restaurant.location || "",
        phone: restaurant.phone || "",
        email: restaurant.email || "",
        description: restaurant.description || "",
        capacity: restaurant.capacity || "",
        opening_hours: restaurant.opening_hours || "",
        cuisine_type: restaurant.cuisine_type || "",
        status: restaurant.status || "active",
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

  useEffect(() => {
    fetchRestaurants()
  }, [])

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1.5rem" }}>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <div className="d-flex align-items-center">
              <Button variant="outline-secondary" onClick={() => navigate("/dashboard")} className="me-3">
                <FaArrowLeft />
              </Button>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d3748", margin: 0 }}>
                  Restaurant Management
                </h1>
                <p style={{ color: "#6b7280", margin: 0 }}>Manage all restaurants in the system</p>
              </div>
            </div>
          </Col>
          <Col xs="auto" className="d-flex gap-2">
            <Button variant="outline-primary" onClick={fetchRestaurants}>
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

        {/* Restaurants Table */}
        <Card style={{ border: "none", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Card.Header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb" }}>
            <h5 style={{ margin: 0, fontWeight: "600" }}>All Restaurants ({restaurants.length})</h5>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : restaurants.length > 0 ? (
              <Table responsive hover className="mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Cuisine</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr key={restaurant.id}>
                      <td style={{ fontWeight: "500" }}>{restaurant.name}</td>
                      <td>{restaurant.location}</td>
                      <td>{restaurant.phone}</td>
                      <td>{restaurant.email}</td>
                      <td>{restaurant.cuisine_type}</td>
                      <td>{restaurant.capacity}</td>
                      <td>
                        <Badge bg={restaurant.status === "active" ? "success" : "secondary"}>{restaurant.status}</Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            size="sm"
                            variant="outline-info"
                            onClick={() => openModal("view", restaurant)}
                            title="View Details"
                          >
                            <FaEye />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => openModal("edit", restaurant)}
                            title="Edit Restaurant"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteRestaurant(restaurant.id)}
                            title="Delete Restaurant"
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
                <p>No restaurants found</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Modal for Create/Edit/View */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {modalMode === "edit" && "Edit Restaurant"}
              {modalMode === "view" && "Restaurant Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Restaurant Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cuisine Type</Form.Label>
                    <Form.Select
                      name="cuisine_type"
                      value={formData.cuisine_type}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                    >
                      <option value="">Select Cuisine</option>
                      <option value="Italian">Italian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Indian">Indian</option>
                      <option value="American">American</option>
                      <option value="French">French</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Mediterranean">Mediterranean</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      min="1"
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Opening Hours</Form.Label>
                <Form.Control
                  type="text"
                  name="opening_hours"
                  value={formData.opening_hours}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon-Sun: 9:00 AM - 10:00 PM"
                  disabled={modalMode === "view"}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={modalMode === "view"}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={modalMode === "view"}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {modalMode === "view" ? "Close" : "Cancel"}
            </Button>
            {modalMode !== "view" && (
              <Button variant="primary" onClick={handleSubmit}>
                Update Restaurant
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default RestaurantManagement
