# ChakulaKonnect Backend

Node.js/Express REST API with PostgreSQL

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure your database in `.env`

4. Run development server:
```bash
npm run dev
```

## API Endpoints

See [API Documentation](../docs/API_DOCUMENTATION.md)

## Project Structure
```
src/
├── config/       # Database & app configuration
├── controllers/  # Request handlers
├── middleware/   # Authentication, validation, etc.
├── models/       # Database models
├── routes/       # API routes
└── utils/        # Helper functions
```

# ChakulaKonnect - Complete API Documentation
**Base URL:** `https://chakulakonnect-backend.onrender.com/api`

---

## 🔐 AUTHENTICATION ENDPOINTS

### 1. Register User
**Endpoint:** `POST /auth/register`

**Used in:** Registration page

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phoneNumber": "+2348012345678",
  "userType": "consumer",
  "location": {
    "address": "123 Main Street",
    "city": "Lagos",
    "state": "Lagos State"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+2348012345678",
      "userType": "consumer",
      "location": {...},
      "isVerified": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
  }
}
```

**Validation Rules:**
- All fields required
- Email must be valid format
- Password minimum 8 characters
- userType: "consumer" or "seller" only
- Location must have: address, city, state

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Used in:** Login page

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
  }
}
```

**After Login:**
- Store token in localStorage/cookies
- Store user object in state
- Include token in all future requests: `Authorization: Bearer {token}`

---

## USER PROFILE ENDPOINTS (All Users)

### 3. Get Current User Profile
**Endpoint:** `GET /users/me`

**Used in:** Profile page, Account settings

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+2348012345678",
      "userType": "consumer",
      "location": {
        "address": "123 Main Street",
        "city": "Lagos",
        "state": "Lagos State"
      },
      "isVerified": false,
      "isActive": true,
      "createdAt": "2026-02-18T..."
    }
  }
}
```

---

### 4. Update Profile
**Endpoint:** `PUT /users/profile`

**Used in:** Edit profile page

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "fullName": "John Updated",
  "phoneNumber": "+2348087654321",
  "location": {
    "address": "456 New Street",
    "city": "Abuja",
    "state": "FCT"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {...updated user object...}
  }
}
```

**Note:** Email and userType cannot be changed

---

### 5. Change Password
**Endpoint:** `PUT /users/password`

**Used in:** Change password page, Security settings

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Validation:**
- Current password must be correct
- New password minimum 8 characters

---

## FOOD MARKETPLACE ENDPOINTS (Public)

### 6. Browse All Foods
**Endpoint:** `GET /foods`

**Used in:** 
- Marketplace homepage
- Browse foods page
- Search results page

**Query Parameters (all optional):**
```
?category=Vegetables
&minPrice=100
&maxPrice=1000
&status=available
&location=Lagos
&search=tomato
&page=1
&limit=20
```

**Example:**
```
GET /foods?category=Vegetables&minPrice=100&maxPrice=1000&location=Lagos&page=1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "foods": [
      {
        "id": "uuid",
        "name": "Fresh Tomatoes",
        "description": "Organic farm-fresh tomatoes",
        "category": "Vegetables",
        "price": "500.00",
        "quantity": "50.00",
        "unit": "kg",
        "images": ["url1", "url2"],
        "location": {
          "address": "Farm Road 45",
          "city": "Ibadan",
          "state": "Oyo State"
        },
        "status": "available",
        "nutritionInfo": {
          "calories": 18,
          "protein": 0.9,
          "carbs": 3.9
        },
        "seller": {
          "id": "uuid",
          "fullName": "John Farmer",
          "phoneNumber": "+234...",
          "location": {...}
        },
        "createdAt": "2026-02-18T...",
        "updatedAt": "2026-02-18T..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

**Available Categories:**
- Vegetables
- Fruits
- Grains
- Proteins
- Dairy
- Legumes
- Tubers
- Spices
- Other

**Available Statuses:**
- available
- out_of_stock
- surplus

**Frontend Implementation:**
- Display as grid/list of food cards
- Add filter dropdowns for category, price range, location, status
- Add search bar (searches name and description)
- Add pagination controls

---

### 7. Get Single Food Details
**Endpoint:** `GET /foods/:id`

**Used in:** Food detail page

**Example:**
```
GET /foods/123e4567-e89b-12d3-a456-426614174000
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "food": {
      "id": "uuid",
      "name": "Fresh Tomatoes",
      "description": "Full description...",
      "category": "Vegetables",
      "price": "500.00",
      "quantity": "50.00",
      "unit": "kg",
      "images": ["url1", "url2", "url3"],
      "location": {...},
      "status": "available",
      "nutritionInfo": {
        "calories": 18,
        "protein": 0.9,
        "carbs": 3.9,
        "fiber": 1.2
      },
      "seller": {
        "id": "uuid",
        "fullName": "John Farmer",
        "email": "john@example.com",
        "phoneNumber": "+2348087654321",
        "location": {...}
      },
      "createdAt": "2026-02-18T...",
      "updatedAt": "2026-02-18T..."
    }
  }
}
```

**Frontend Implementation:**
- Image gallery/carousel
- Full product details
- Nutrition information table
- Seller contact card (name, phone, location)
- "Contact Seller" button (opens phone/WhatsApp)
- "Add to Cart" button (if implementing cart)

---

## SELLER DASHBOARD ENDPOINTS

### 8. Get Seller's Own Listings
**Endpoint:** `GET /foods/seller/my-listings`

**Used in:** Seller dashboard home page

**Headers:**
```
Authorization: Bearer {seller_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "id": "uuid",
        "name": "Fresh Tomatoes",
        "category": "Vegetables",
        "price": "500.00",
        "quantity": "50.00",
        "unit": "kg",
        "status": "available",
        "images": ["url1"],
        "createdAt": "2026-02-18T..."
      }
    ],
    "stats": {
      "totalListings": 15,
      "availableListings": 12,
      "outOfStockListings": 2,
      "surplusListings": 1,
      "totalQuantity": 500
    }
  }
}
```

**Frontend Implementation:**
- Dashboard with stat cards showing:
  - Total listings count
  - Available items count
  - Out of stock count
  - Surplus items count
  - Total quantity across all items
- Grid/table of seller's food listings
- "Add New Product" button
- Edit/Delete buttons on each item

---

### 9. Create Food Listing
**Endpoint:** `POST /foods`

**Used in:** Add new product page/form (Seller only)

**Headers:**
```
Authorization: Bearer {seller_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Fresh Tomatoes",
  "description": "Organic farm-fresh tomatoes harvested today",
  "category": "Vegetables",
  "price": 500,
  "quantity": 50,
  "unit": "kg",
  "images": ["https://example.com/tomato1.jpg", "https://example.com/tomato2.jpg"],
  "location": {
    "address": "Farm Road 45",
    "city": "Ibadan",
    "state": "Oyo State"
  },
  "status": "available",
  "nutritionInfo": {
    "calories": 18,
    "protein": 0.9,
    "carbs": 3.9,
    "fiber": 1.2
  }
}
```

**Required Fields:**
- name (string)
- description (string)
- category (one of the categories listed above)
- price (number, in Naira)
- quantity (number)
- unit (kg, g, litre, ml, pieces, bags, bunches, dozen)
- images (array of URLs, minimum 1)
- location (object with address, city, state)
- status (available, out_of_stock, surplus)

**Optional Fields:**
- nutritionInfo (object)

**Response (201):**
```json
{
  "success": true,
  "message": "Food listing created successfully",
  "data": {
    "food": {...created food object with seller info...}
  }
}
```

**Frontend Implementation:**
- Multi-step form or single form with sections:
  1. Basic Info (name, description, category)
  2. Pricing & Quantity (price, quantity, unit)
  3. Images (upload multiple images)
  4. Location (address, city, state - can pre-fill from seller profile)
  5. Status (radio buttons: available/out of stock/surplus)
  6. Nutrition Info (optional expandable section)
- Image upload functionality (upload to cloud storage, get URLs)
- Validation for all required fields
- Success message and redirect to dashboard

---

### 10. Update Food Listing
**Endpoint:** `PUT /foods/:id`

**Used in:** Edit product page (Seller only)

**Headers:**
```
Authorization: Bearer {seller_token}
Content-Type: application/json
```

**Request Body (send only fields to update):**
```json
{
  "price": 450,
  "quantity": 30,
  "status": "surplus"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Food listing updated successfully",
  "data": {
    "food": {...updated food object...}
  }
}
```

**Frontend Implementation:**
- Same form as "Add Product" but pre-filled with existing data
- "Update" button instead of "Create"
- Seller can only update their own listings
- If user tries to update someone else's listing, will get 403 error

---

### 11. Delete Food Listing
**Endpoint:** `DELETE /foods/:id`

**Used in:** Delete confirmation modal (Seller only)

**Headers:**
```
Authorization: Bearer {seller_token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Food listing deleted successfully"
}
```

**Frontend Implementation:**
- Delete button on listing card
- Confirmation modal: "Are you sure you want to delete [Food Name]?"
- On confirm, call DELETE endpoint
- Remove item from UI on success
- Show success message

**Note:** This is a soft delete (sets isActive=false). Item won't show in browse but stays in database.

---

## 🤖 AI-POWERED ENDPOINTS

### 12. Get AI Food Recommendations
**Endpoint:** `POST /ai/recommendations`

**Used in:** 
- Budget Helper page
- AI Assistant widget
- Consumer dashboard "Recommendations" section

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "budget": 5000,
  "preferences": ["Vegetables", "Grains"]
}
```

**Fields:**
- budget (required, number): User's budget in Naira
- preferences (optional, array): Categories user prefers

**Response (200):**
```json
{
  "success": true,
  "data": {
    "recommended_basket": [
      {
        "food_id": "uuid",
        "name": "Rice",
        "category": "Grains",
        "price": 1500,
        "quantity": 1,
        "unit": "kg"
      },
      {
        "food_id": "uuid",
        "name": "Tomatoes",
        "category": "Vegetables",
        "price": 500,
        "quantity": 1,
        "unit": "kg"
      }
    ],
    "total_cost": 2000,
    "budget": 5000,
    "savings": 3000,
    "categories_included": ["Grains", "Vegetables"]
  }
}
```

**Frontend Implementation Options:**

**Option 1: Budget Helper Page**
```
Route: /budget-helper

UI:
1. Budget input field: "Enter your budget (₦)"
2. Category preferences (checkboxes):
   ☐ Vegetables
   ☐ Fruits
   ☐ Grains
   ☐ Proteins
   ☐ Dairy
   ☐ Legumes
3. "Get Recommendations" button
4. Results section showing:
   - Recommended basket (cards/list)
   - Total cost
   - Savings
   - "Add to Cart" buttons (if implementing cart)
```

**Option 2: AI Chat Widget**
```
Floating chat icon → Opens chat

Conversation:
Bot: "Hi! I can help you find nutritious food within your budget. What's your budget?"
User: "5000 naira"
Bot: "Great! Any preferences? (Vegetables, Fruits, Grains, etc.)"
User: "Vegetables and grains"
[Call API]
Bot: "Based on your budget of ₦5000, I recommend:
     • Rice (₦1500)
     • Tomatoes (₦500)
     Total: ₦2000, Savings: ₦3000"
```

**Option 3: Simple Form on Consumer Dashboard**
```
Widget titled "Budget Assistant"

Form:
- Budget: [input]
- Preferences: [multi-select dropdown]
- [Get Recommendations button]

Results display below
```

---

### 13. Get Seller Insights
**Endpoint:** `GET /ai/seller/insights`

**Used in:** Seller analytics/insights page

**Headers:**
```
Authorization: Bearer {seller_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_listings": 15,
    "available_listings": 12,
    "out_of_stock": 2,
    "surplus_items": 1,
    "categories": ["Vegetables", "Fruits", "Grains"],
    "total_inventory_value": 125000.50
  }
}
```

**Frontend Implementation:**
- Analytics page on seller dashboard
- Display as cards/charts:
  - Pie chart: Available vs Out of Stock vs Surplus
  - Bar chart: Products by Category
  - Big number: Total Inventory Value
  - List: Categories you sell
- Refresh button to get latest insights

---

### 14. Get Demand Forecast (Future)
**Endpoint:** `POST /ai/seller/forecast`

**Used in:** Seller forecast/predictions page

**Headers:**
```
Authorization: Bearer {seller_token}
```

**Current Response:**
```json
{
  "success": true,
  "message": "Forecast feature requires sales data. This will be available once you have sales history.",
  "data": {
    "seller_id": "uuid",
    "note": "Make some sales first, then forecasts will be generated based on your sales history"
  }
}
```

**Frontend Implementation:**
- For now, show message: "Forecasting coming soon! Make some sales and we'll predict future demand."
- In future (when sales tracking is added), will show:
  - Monthly revenue forecast
  - Daily sales predictions
  - Trend charts

---

## SCREEN-TO-ENDPOINT MAPPING

### CONSUMER SCREENS

| Screen | Endpoints Used |
|--------|---------------|
| **Registration Page** | POST /auth/register |
| **Login Page** | POST /auth/login |
| **Marketplace Homepage** | GET /foods (with filters) |
| **Search Results** | GET /foods?search={query} |
| **Food Detail Page** | GET /foods/:id |
| **Budget Helper / AI Assistant** | POST /ai/recommendations |
| **My Profile** | GET /users/me |
| **Edit Profile** | PUT /users/profile |
| **Change Password** | PUT /users/password |
| **Account Settings** | GET /users/me, PUT /users/profile, PUT /users/password |

---

### SELLER SCREENS

| Screen | Endpoints Used |
|--------|---------------|
| **Seller Dashboard Home** | GET /foods/seller/my-listings |
| **Add New Product** | POST /foods |
| **Edit Product** | GET /foods/:id, PUT /foods/:id |
| **Delete Product** | DELETE /foods/:id |
| **Analytics/Insights** | GET /ai/seller/insights |
| **Forecast (Future)** | POST /ai/seller/forecast |
| **My Profile** | GET /users/me |
| **Edit Profile** | PUT /users/profile |
| **Change Password** | PUT /users/password |

---

## AUTHENTICATION FLOW

### After Login/Registration:
1. Store token: `localStorage.setItem('token', data.data.token)`
2. Store user: `localStorage.setItem('user', JSON.stringify(data.data.user))`
3. Redirect based on userType:
   - If consumer → Marketplace
   - If seller → Seller Dashboard

### For Protected Routes:
```javascript
const token = localStorage.getItem('token');

fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

### On Logout:
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
// Redirect to login
```

### Token Expiry:
- Tokens expire after 7 days
- If you get 401 error, redirect to login
- User needs to log in again

---

## ERROR RESPONSES

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development only)"
}
```

**Common Status Codes:**
- 200: Success
- 201: Created (for POST requests)
- 400: Bad Request (validation error)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (not allowed, e.g., consumer trying seller endpoints)
- 404: Not Found
- 500: Server Error

**Frontend Error Handling:**
```javascript
const response = await fetch('/api/endpoint');
const data = await response.json();

if (!data.success) {
  // Show error message to user
  alert(data.message);
  
  // If 401, redirect to login
  if (response.status === 401) {
    window.location.href = '/login';
  }
}
```

---

## DEPLOYMENT NOTES

**Production URL:** `https://chakulakonnect-backend.onrender.com/api`

**Important:**
- First request after inactivity may take 30 seconds (free tier spins down)
- After that, responses are fast
- AI features require Python service to be running

---

## SUPPORT

If you encounter issues:
1. Check that token is included for protected routes
2. Verify request body matches documentation
3. Check browser console for error details
4. Contact backend team with:
   - Endpoint you're calling
   - Request body
   - Error response

---

**Last Updated:** February 19, 2026
**API Version:** 1.0.0
**Backend Developer:** Victoria Alayemie
