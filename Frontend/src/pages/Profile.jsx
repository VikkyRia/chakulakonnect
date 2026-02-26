import { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

import infoIcon from "../assets/image/info.svg";
import bellIcon from "../assets/image/bell.svg";
import payIcon from "../assets/image/pay.svg";
import addressIcon from "../assets/image/address.svg";
import orderIcon from "../assets/image/order.svg";

import emailIcon from "../assets/image/email.svg";
import smsIcon from "../assets/image/sms.svg";
import homeIcon from "../assets/image/house.svg";
import officeIcon from "../assets/image/bag.svg";

import { Lock, LogOut } from "lucide-react";

const BASE_URL = "https://chakulakonnect-backend.onrender.com/api";

function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("email");

  const [user, setUser] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    userType: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [homeAddress] = useState({
    street: "",
    state: "",
  });

  const [officeAddress] = useState({
    plot: "",
    street: "",
    state: "",
    region: "",
  });


  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigate = useNavigate()
  const hardcodedOrders = [
    { id: "#CK-9832", product: "Organic Basket", seller: "Green Harvest", total: "₦45,000" },
    { id: "#CK-9715", product: "Fresh Avocados", seller: "Oyo Sellers Hub", total: "₦12,500" },
    { id: "#CK-9650", product: "Premium Wild Honey", seller: "Riverside Sellers", total: "₦18,200" },
  ];

  /* ================= FETCH USER ================= */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(data.data.user)
          );
        }
      })
      .catch(() => setMessage("Failed to load profile."));
  }, []);

  /* ================= UPDATE PROFILE ================= */

  const updateProfileAPI = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Profile updated successfully.");
        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.data.user)
        );
      } else {
        setMessage("Update failed.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  /* ================= CHANGE PASSWORD ================= */

  const changePasswordAPI = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Password changed successfully.");
        setPasswordData({ currentPassword: "", newPassword: "" });
      } else {
        setMessage("Password change failed.");
      }
    } catch {
      setMessage("Error changing password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <div className="profile-wrapper">

      {/* Sidebar */}
      <div className="sidebar">
        <h3>Account Settings</h3>

        <button onClick={() => setActiveTab("personal")}>
          <img src={infoIcon} alt="info" className="sidebar-icon" />
          Personal Info
        </button>

        <button onClick={() => setActiveTab("password")}>
          <Lock className="sidebar-icon" />
          Change Password
        </button>

        <button onClick={() => setActiveTab("orders")}>
          <img src={orderIcon} alt="orders" className="sidebar-icon" />
          Order History
        </button>

        <button onClick={() => setActiveTab("addresses")}>
          <img src={addressIcon} alt="address" className="sidebar-icon" />
          Saved Addresses
        </button>

        <button onClick={() => setActiveTab("notifications")}>
          <img src={bellIcon} alt="notifications" className="sidebar-icon" />
          Notifications
        </button>

        <button onClick={() => setActiveTab("payments")}>
          <img src={payIcon} alt="payments" className="sidebar-icon" />
          Payment Methods
        </button>

        <div className="logout" onClick={handleLogout}>
          <LogOut className="sidebar-icon" />
          Sign Out
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="back-row">
          <button className="back-btn" onClick={() => navigate("/consumer-dashboard")}>
            Back to Dashboard </button>
        </div>

        {message && <p className="message">{message}</p>}

        {/* PERSONAL */}
        {activeTab === "personal" && (
          <div className="card">
            <h2>Personal Information</h2>

            <div className="form-grid">
              <input
                type="text"
                value={user.fullName}
                onChange={(e) =>
                  setUser({ ...user, fullName: e.target.value })
                }
              />

              <input
                type="text"
                value={user.phoneNumber}
                onChange={(e) =>
                  setUser({ ...user, phoneNumber: e.target.value })
                }
              />

              <input type="email" value={user.email} disabled />
              <input type="text" value={user.userType} disabled />
            </div>

            <div className="button-row">
              <button className="primary" onClick={updateProfileAPI}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* PASSWORD */}
        {activeTab === "password" && (
          <div className="card">
            <h2>Change Password</h2>

            <div className="form-grid">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>

            <div className="button-row">
              <button className="primary" onClick={changePasswordAPI}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div className="card">
            <h2>Recent Orders</h2>

            {hardcodedOrders.map(order => (
              <div key={order.id} className="order-row">
                <span>{order.id}</span>
                <span>{order.product}</span>
                <span>{order.seller}</span>
                <span>{order.total}</span>
              </div>
            ))}
          </div>
        )}

        {/* ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="card">
            <h2>Saved Addresses</h2>

            <div className="address-display">
              <img src={homeIcon} alt="home" />
              <p>
                {homeAddress.street
                  ? `${homeAddress.street}, ${homeAddress.state}`
                  : "Click to add home address"}
              </p>
            </div>

            <div className="address-display">
              <img src={officeIcon} alt="office" />
              <p>
                {officeAddress.street
                  ? `${officeAddress.plot}, ${officeAddress.street}`
                  : "Click to add office address"}
              </p>
            </div>
          </div>
        )}

        {/* PAYMENTS */}
        {activeTab === "payments" && (
          <div className="card">
            <h2>Payment Methods</h2>

            {paymentMethods.length === 0 && (
              <p>No payment methods added yet.</p>
            )}

            {paymentMethods.map((method, index) => (
              <div key={index}>
                <strong>{method.type}</strong>
                <p>{method.details}</p>
              </div>
            ))}

            <button
              className="primary small"
              onClick={() =>
                setPaymentMethods([
                  ...paymentMethods,
                  { type: "Visa Card", details: "•••• 1234" },
                ])
              }
            >
              + Add Dummy Card
            </button>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="card">
            <h2>Notification Preferences</h2>

            <div>
              <img src={emailIcon} alt="email" />
              <span>Email Notifications</span>
              <input
                type="radio"
                checked={notificationType === "email"}
                onChange={() => setNotificationType("email")}
              />
            </div>

            <div>
              <img src={smsIcon} alt="sms" />
              <span>SMS Alerts</span>
              <input
                type="radio"
                checked={notificationType === "sms"}
                onChange={() => setNotificationType("sms")}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;