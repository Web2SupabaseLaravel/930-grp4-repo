"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from "react-bootstrap"
import { FaEdit, FaTrash, FaEye, FaSync, FaArrowLeft, FaUserShield, FaUser } from "react-icons/fa"
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

const UserManagement = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("edit")
  const [selectedUser, setSelectedUser] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "customer",
    status: "active",
    password: "",
    password_confirmation: "",
  })

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true)
    try {
      let allUsers = []

      try {
        const response = await apiClient.get("/CustomerManagement?per_page=1000")
        console.log("API Response:", response.data)

        if (response.data.data) {
          allUsers = response.data.data
        } else {
          allUsers = response.data
        }
      } catch (err) {
        console.log("First method failed, trying alternative...")

        try {
          const response = await apiClient.get("/CustomerManagement?limit=1000")
          allUsers = response.data.data || response.data
        } catch (err2) {
          console.log("Second method failed, trying third...")

          try {
            const response = await apiClient.get("/CustomerManagement?all=true")
            allUsers = response.data.data || response.data
          } catch (err3) {
            console.log("Third method failed, trying pagination...")

            allUsers = await fetchAllPages()
          }
        }
      }

      console.log("Total users fetched:", allUsers.length)
      setUsers(allUsers)
      setError(null)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const fetchAllPages = async () => {
    let allUsers = []
    let currentPage = 1
    let hasMorePages = true

    while (hasMorePages) {
      try {
        const response = await apiClient.get(`/CustomerManagement?page=${currentPage}`)
        const pageData = response.data.data || response.data

        if (Array.isArray(pageData) && pageData.length > 0) {
          allUsers = [...allUsers, ...pageData]
          currentPage++

          if (response.data.last_page && currentPage > response.data.last_page) {
            hasMorePages = false
          } else if (pageData.length < 10) {
            hasMorePages = false
          }
        } else {
          hasMorePages = false
        }
      } catch (err) {
        console.error(`Error fetching page ${currentPage}:`, err)
        hasMorePages = false
      }
    }

    return allUsers
  }

  // Update user
  const updateUser = async () => {
    setUpdating(true)
    try {
      const updateData = { ...formData }
      if (!updateData.password) {
        delete updateData.password
        delete updateData.password_confirmation
      }

      await apiClient.put(`/CustomerManagement/${selectedUser.id}`, updateData)
      setSuccess("User updated successfully!")
      setShowModal(false)
      resetForm()
      fetchUsers()
    } catch (err) {
      console.error("Error updating user:", err)
      setError("Failed to update user")
    } finally {
      setUpdating(false)
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setDeleting(id)
      try {
        await apiClient.delete(`/CustomerManagement/${id}`)
        setSuccess("User deleted successfully!")
        fetchUsers()
      } catch (err) {
        console.error("Error deleting user:", err)
        setError("Failed to delete user")
      } finally {
        setDeleting(null)
      }
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalMode === "edit") {
      updateUser()
    }
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      role: "customer",
      status: "active",
      password: "",
      password_confirmation: "",
    })
    setSelectedUser(null)
  }

  // Open modal for different modes
  const openModal = (mode, user) => {
    setModalMode(mode)
    setSelectedUser(user)
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role || "customer",
        status: user.status || "active",
        password: "",
        password_confirmation: "",
      })
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
    fetchUsers()
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
                <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d3748", margin: 0 }}>User Management</h1>
                <p style={{ color: "#6b7280", margin: 0 }}>Manage all users and customers in the system</p>
              </div>
            </div>
          </Col>
          <Col xs="auto" className="d-flex gap-2">
            <Button variant="outline-primary" onClick={fetchUsers} disabled={loading}>
              <FaSync className={loading ? "fa-spin me-2" : "me-2"} />
              Refresh All Data
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

        {/* Users Table */}
        <Card style={{ border: "none", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <Card.Header style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h5 style={{ margin: 0, fontWeight: "600" }}>All Users ({users.length})</h5>
              <small className="text-muted">
                {loading ? "Loading all users..." : `Showing all ${users.length} users`}
              </small>
            </div>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading all users...</span>
                </div>
                <p className="mt-2 text-muted">Fetching all user data...</p>
              </div>
            ) : users.length > 0 ? (
              <Table responsive hover className="mb-0">
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <Badge variant="secondary">{user.id}</Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {user.role === "admin" ? (
                            <FaUserShield className="text-warning me-2" />
                          ) : (
                            <FaUser className="text-secondary me-2" />
                          )}
                          <span style={{ fontWeight: "500" }}>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td>
                        <Badge bg={user.role === "admin" ? "warning" : "info"}>{user.role || "customer"}</Badge>
                      </td>
                      <td>
                        <Badge bg={user.status === "active" ? "success" : "secondary"}>{user.status || "active"}</Badge>
                      </td>
                      <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            size="sm"
                            variant="outline-info"
                            onClick={() => openModal("view", user)}
                            title="View Details"
                          >
                            <FaEye />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => openModal("edit", user)}
                            title="Edit User"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => deleteUser(user.id)}
                            disabled={deleting === user.id}
                            title="Delete User"
                          >
                            {deleting === user.id ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              <FaTrash />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center p-4 text-muted">
                <p>No users found</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Modal for Edit/View */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {modalMode === "edit" && "Edit User"}
              {modalMode === "view" && "User Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
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
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled={modalMode === "view"}
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                    </Form.Select>
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {modalMode !== "view" && (
                <>
                  <hr />
                  <h6>Change Password (Optional)</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Leave blank to keep current password"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          required={formData.password}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {modalMode === "view" ? "Close" : "Cancel"}
            </Button>
            {modalMode !== "view" && (
              <Button variant="primary" onClick={handleSubmit} disabled={updating}>
                {updating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  "Update User"
                )}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default UserManagement
