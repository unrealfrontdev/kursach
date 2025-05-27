import React, { useState, useEffect } from 'react';

const AdminUsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    telegram: ''
  });

  // Загрузка пользователей из базы при монтировании
  const fetchUsers = () => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      username: '',
      telegram: ''
    });
    setShowModal(true);
  };

  // Удаление пользователя через сервер
  const handleDeleteUser = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsers(prev => prev.filter(user => user.id !== userId));
          }
        });
    }
  };

  // Добавление пользователя через сервер
  const handleSubmit = () => {
    if (!formData.username || !formData.telegram) return;

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setShowModal(false);
          setEditingUser(null);
          setFormData({ username: '', telegram: '' });
          fetchUsers();
        }
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
      ></script>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">
                    <i className="fas fa-users me-2"></i>
                    Управление пользователями
                  </h4>
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={handleAddUser}
                  >
                    <i className="fas fa-plus me-1"></i>
                    Добавить пользователя
                  </button>
                </div>
              </div>
              
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Telegram</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.username}</td>
                          <td>{user.telegram}</td>
                          <td>
                            <div className="btn-group" role="group">
                              {/* Редактирование можно реализовать аналогично */}
                              <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteUser(user.id)}
                                title="Удалить"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {users.length === 0 && (
                  <div className="text-center py-4">
                    <i className="fas fa-users fa-3x text-muted mb-3"></i>
                    <p className="text-muted">Пользователи не найдены</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal для добавления пользователя */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Добавить пользователя
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseModal}
                ></button>
              </div>
              
              <div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Имя *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="telegram" className="form-label">Telegram *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telegram"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Отмена
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Добавить пользователя
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .avatar-circle {
          font-weight: 600;
        }
        .modal.show {
          display: block !important;
        }
        .table th {
          border-top: none;
          font-weight: 600;
        }
        .btn-group .btn {
          margin-right: 2px;
        }
        .card {
          border: none;
          border-radius: 10px;
        }
        .card-header {
          border-radius: 10px 10px 0 0 !important;
        }
      `}</style>
    </>
  );
};

export default AdminUsersPanel;