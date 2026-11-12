
import { useState } from "react";
import "./App.css";

const foodItems = [
  {
    id: 1,
    name: "Chicken Adobo",
    description: "Classic Filipino chicken adobo served with rice.",
    price: 85,
    category: "Best Sellers",
    image: "https://nutriscan.app/calories-nutrition/images/chicken-adobo-c8dfb.webp"
  },
  {
    id: 2,
    name: "Sinigang na Baboy",
    description: "Sour Filipino pork soup with fresh vegetables.",
    price: 100,
    category: "Best Sellers",
    image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/sinigang_broth.jpg"
  },
  {
    id: 3,
    name: "Tortang Talong",
    description: "Filipino eggplant omelette served with rice.",
    price: 65,
    category: "Best Sellers",
    image: "https://i0.wp.com/www.angsarap.net/wp-content/uploads/2021/04/Tortang-Talong-Wide.jpg"
  },
  {
    id: 4,
    name: "Tapsilog",
    description: "Beef tapa, fried rice, and egg.",
    price: 95,
    category: "Silog Meals",
    image: "https://www.recipeshare.app/imagesFood/ultimate-filipino-tapsilog.jpg"
  },
  {
    id: 5,
    name: "Longsilog",
    description: "Filipino longganisa with rice and egg.",
    price: 85,
    category: "Silog Meals",
    image: "https://i.pinimg.com/736x/bd/f9/2a/bdf92acf572f595aa0bd6b6a710d2378.jpg"
  },
  {
    id: 6,
    name: "Iced Tea",
    description: "Refreshing cold iced tea.",
    price: 30,
    category: "Drinks",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900"
  }
];

const carinderias = [
  {
    id: 1,
    name: "Boss Clarence Carenderia & Coffee Shop",
    rating: "4.8",
    location: "Chitongco, Mondragon, Northern Samar",
    image: "https://sa.kapamilya.com/absnews/abscbnnews/media/ancx/food-n-drink/2019/06/1pampanga.jpg",
    mapQuery: "Boss Clarence Carenderia & Coffee Shop, Chitongco, Mondragon, Northern Samar, Philippines"
  },
  {
    id: 2,
    name: "Sea Side ni Francis",
    rating: "4.7",
    location: "Eco, Mondragon, Northern Samar",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Carinderia_Cebu_City_008.jpg",
    mapQuery: "Sea Side ni Francis, Eco, Mondragon, Northern Samar, Philippines"
  },
  {
    id: 3,
    name: "Rod House Karenderya",
    rating: "4.9",
    location: "Emilda, Mondragon, Northern Samar",
    image: "https://images.deliveryhero.io/image/fd-ph/LH/yn46-listing.jpg",
    mapQuery: "Rod House Karenderya, Emilda, Mondragon, Northern Samar, Philippines"
  }
];

export default function App() {
  const [page, setPage] = useState("signup");
  const [selectedFood, setSelectedFood] = useState(foodItems[0]);
  const [selectedCarinderia, setSelectedCarinderia] = useState(carinderias[0]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [notice, setNotice] = useState("");

  const go = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredFoods = foodItems.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || food.category === category;
    return matchesSearch && matchesCategory;
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart() {
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item.id === selectedFood.id);

      if (existing) {
        return oldCart.map((item) =>
          item.id === selectedFood.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...oldCart, { ...selectedFood, quantity }];
    });

    setNotice("Food added to your cart!");
    setQuantity(1);
    go("cart");
  }

  function changeQuantity(id, amount) {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function Header() {
    return (
      <header className="site-header">
        <button className="brand" onClick={() => go("home")}>
          <span className="brand-icon">🍲</span>
          <span>Karenderya</span>
        </button>

        <nav className="main-nav">
          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => go("carinderias")}>Carinderias</button>
          <button onClick={() => go("menu")}>Food Menu</button>
          <button onClick={() => go("review")}>Reviews</button>
        </nav>

        <div className="header-actions">
          <button className="cart-button" onClick={() => go("cart")}>
            🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
          <button className="login-button" onClick={() => go("login")}>
            Login
          </button>
        </div>
      </header>
    );
  }

  function Footer() {
    return (
      <footer className="site-footer">
        <h2>Karenderya</h2>
        <p>LUTONG BAHAY - LUTONG MAY PUSO</p>
        <span>© 2026 Karenderya. All rights reserved.</span>
      </footer>
    );
  }

  function FoodCard({ food }) {
    return (
      <article className="food-card">
        <img src={food.image} alt={food.name} />
        <div className="food-card-info">
          <span className="food-category">{food.category}</span>
          <h3>{food.name}</h3>
          <p>{food.description}</p>
          <div className="food-card-bottom">
            <strong>₱{food.price}</strong>
            <button
              onClick={() => {
                setSelectedFood(food);
                go("food");
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </article>
    );
  }

  function RestaurantCard({ place }) {
    return (
      <article className="restaurant-card">
        <img src={place.image} alt={place.name} />
        <div className="restaurant-info">
          <span className="rating">★ {place.rating}</span>
          <h3>{place.name}</h3>
          <p>{place.location}</p>

          <button
            onClick={() => {
              setSelectedCarinderia(place);
              go("restaurant");
            }}
          >
            View Carinderia →
          </button>

          <button
            className="light-btn"
            onClick={() => {
              setSelectedCarinderia(place);
              go("location");
            }}
          >
            📍 View Location
          </button>
        </div>
      </article>
    );
  }

  return (
    <div className="website">

      {page !== "signup" && <Header />}

      {page === "home" && (
        <main className="home-page">
          <section className="hero-section home-hero">
            <div className="hero-text">
              <span className="eyebrow">WELCOME TO KARENDERYA</span>
              <h1>
                Discover Local<br />
                <em>Carinderias</em>
              </h1>
              <p>
                Find delicious, affordable, and freshly cooked Filipino
                meals from carinderias near you.
              </p>
              <div className="hero-buttons">
                <button
                  className="orange-btn"
                  onClick={() => go("carinderias")}
                >
                  Explore Carinderias
                </button>
                <button
                  className="light-btn"
                  onClick={() => go("menu")}
                >
                  View Food Menu
                </button>
              </div>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FIND YOUR FAVORITE</span>
                <h2>Nearby Carinderias</h2>
              </div>
              <button
                className="text-button"
                onClick={() => go("carinderias")}
              >
                View all →
              </button>
            </div>

            <div className="restaurant-grid">
              {carinderias.map((place) => (
                <RestaurantCard key={place.id} place={place} />
              ))}
            </div>
          </section>

          <section className="content-section food-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TASTY AND AFFORDABLE</span>
                <h2>Popular Filipino Foods</h2>
              </div>
              <button
                className="text-button"
                onClick={() => go("menu")}
              >
                See menu →
              </button>
            </div>

            <div className="food-grid">
              {foodItems.slice(0, 3).map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          </section>
        </main>
      )}

      {page === "carinderias" && (
        <main className="page-content">
          <span className="eyebrow">EXPLORE LOCAL FOOD</span>
          <h1>Discover Carinderias</h1>
          <p className="page-description">
            Find your favorite local Filipino food places.
          </p>
          <div className="restaurant-grid">
            {carinderias.map((place) => (
              <RestaurantCard key={place.id} place={place} />
            ))}
          </div>
        </main>
      )}

      {page === "restaurant" && (
        <main className="page-content">
          <button
            className="text-button"
            onClick={() => go("carinderias")}
          >
            ← Back to Carinderias
          </button>

          <div className="restaurant-detail">
            <img
              src={selectedCarinderia.image}
              alt={selectedCarinderia.name}
            />
            <div>
              <span className="eyebrow">LOCAL CARINDERIA</span>
              <h1>{selectedCarinderia.name}</h1>
              <p className="rating">
                ★ {selectedCarinderia.rating} Customer Rating
              </p>
              <p>{selectedCarinderia.location}</p>
              <p>
                Enjoy affordable and freshly prepared Filipino home-cooked meals.
              </p>
              <button className="orange-btn" onClick={() => go("menu")}>
                Explore Food Menu
              </button>
              <button
                className="light-btn"
                onClick={() => go("location")}
              >
                📍 View Location
              </button>
            </div>
          </div>
        </main>
      )}

      {page === "menu" && (
        <main className="page-content">
          <span className="eyebrow">MADE FRESH EVERY DAY</span>
          <h1>Our Food Menu</h1>
          <p className="page-description">
            Choose from our delicious Filipino meals.
          </p>

          <div className="menu-tools">
            <input
              placeholder="Search for food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="category-tabs">
              {["All", "Best Sellers", "Silog Meals", "Drinks"].map((item) => (
                <button
                  key={item}
                  className={category === item ? "category-active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="food-grid">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </main>
      )}

      {page === "food" && (
        <main className="page-content">
          <button className="text-button" onClick={() => go("menu")}>
            ← Back to Menu
          </button>
          <div className="food-detail">
            <img src={selectedFood.image} alt={selectedFood.name} />
            <div>
              <span className="eyebrow">{selectedFood.category}</span>
              <h1>{selectedFood.name}</h1>
              <h2 className="price">₱{selectedFood.price}</h2>
              <p>{selectedFood.description}</p>
              <p>Freshly prepared Filipino food, served with rice.</p>

              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <strong>{quantity}</strong>
                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>

              <button className="orange-btn" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      )}

      {page === "cart" && (
        <main className="page-content narrow-content">
          <span className="eyebrow">YOUR ORDER</span>
          <h1>Shopping Cart</h1>
          {notice && <p className="success-message">{notice}</p>}

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span>🛒</span>
              <h2>Your cart is empty</h2>
              <p>Explore our menu and add your favorite food.</p>
              <button className="orange-btn" onClick={() => go("menu")}>
                Browse Food Menu
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-row-info">
                    <h3>{item.name}</h3>
                    <p>₱{item.price}</p>
                    <div className="quantity-control">
                      <button onClick={() => changeQuantity(item.id, -1)}>
                        −
                      </button>
                      <strong>{item.quantity}</strong>
                      <button onClick={() => changeQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <strong>₱{item.price * item.quantity}</strong>
                </div>
              ))}

              <div className="total-row">
                <strong>Total</strong>
                <strong>₱{total}</strong>
              </div>

              <button className="orange-btn" onClick={() => go("checkout")}>
                Proceed to Checkout
              </button>
            </>
          )}
        </main>
      )}

      {page === "checkout" && (
        <main className="page-content narrow-content">
          <span className="eyebrow">ALMOST THERE</span>
          <h1>Checkout</h1>

          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />

          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />

          <label>Delivery Address</label>
          <input placeholder="Your complete address" />

          <div className="total-row">
            <strong>Total Payment</strong>
            <strong>₱{total}</strong>
          </div>

          <button
            className="orange-btn"
            onClick={() => {
              if (!name || !email || cart.length === 0) {
                alert("Please complete your information and add food to your cart.");
                return;
              }
              go("confirmation");
            }}
          >
            Place Order
          </button>
        </main>
      )}

      {page === "confirmation" && (
        <main className="page-content narrow-content confirmation">
          <div className="confirmation-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for choosing Karenderya.</p>
          <p>Your order has been received.</p>

          <button
            className="orange-btn"
            onClick={() => {
              setCart([]);
              setNotice("");
              go("home");
            }}
          >
            Back to Home
          </button>

          <button className="light-btn" onClick={() => go("review")}>
            Write a Review
          </button>
        </main>
      )}

      {page === "login" && (
        <main className="auth-page">
          <div className="auth-card">
            <span className="eyebrow">WELCOME BACK</span>
            <h1>Login to Karenderya</h1>

            <label>Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button
              className="orange-btn"
              onClick={() => {
                if (!email || !password) {
                  alert("Please enter your email and password.");
                  return;
                }
                go("home");
              }}
            >
              Login
            </button>

            <p>
              Don't have an account?{" "}
              <button className="inline-link" onClick={() => go("signup")}>
                Sign Up
              </button>
            </p>
          </div>
        </main>
      )}

      {page === "signup" && (
        <main className="auth-page">
          <div className="auth-card">
            <span className="eyebrow">JOIN OUR COMMUNITY</span>
            <h1>Create an Account</h1>

            <label>Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />

            <button
              className="orange-btn"
              onClick={() => {
                if (!name.trim() || !email.trim() || !password.trim()) {
                  alert("Please complete all fields before creating your account.");
                  return;
                }

                setNotice("Account created successfully! Welcome to Karenderya.");
                go("home");
              }}
            >
              Create Account
            </button>

            <p>
              Already have an account?{" "}
              <button className="inline-link" onClick={() => go("login")}>
                Login
              </button>
            </p>
          </div>
        </main>
      )}

      {page === "review" && (
        <main className="page-content narrow-content">
          <span className="eyebrow">YOUR FEEDBACK MATTERS</span>
          <h1>Write a Review</h1>
          <p>How was your experience with Karenderya?</p>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={star <= rating ? "star-selected" : ""}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience..."
          />

          <button
            className="orange-btn"
            onClick={() => {
              alert("Thank you for your review!");
              setReview("");
              go("home");
            }}
          >
            Submit Review
          </button>
        </main>
      )}

      {page === "profile" && (
        <main className="page-content narrow-content">
          <span className="eyebrow">YOUR ACCOUNT</span>
          <h1>My Profile</h1>
          <div className="profile-avatar">👤</div>
          <h2>{name || "Guest User"}</h2>
          <p>{email || "No email added"}</p>
          <button className="light-btn" onClick={() => go("login")}>
            Log Out
          </button>
        </main>
      )}

      {page === "location" && (
        <main className="page-content narrow-content">
          <button
            className="text-button"
            onClick={() => go("carinderias")}
          >
            ← Back to Carinderias
          </button>

          <span className="eyebrow">FIND US</span>
          <h1>Carinderia Location</h1>
          <h2>{selectedCarinderia.name}</h2>
          <p>{selectedCarinderia.location}</p>

          <iframe
            title={`Map of ${selectedCarinderia.name}`}
            width="100%"
            height="400"
            style={{
              border: 0,
              borderRadius: "15px",
              marginTop: "20px"
            }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              selectedCarinderia.mapQuery
            )}&output=embed`}
          />

          <a
            className="orange-btn"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              selectedCarinderia.mapQuery
            )}`}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "20px",
              textDecoration: "none"
            }}
          >
            Open in Google Maps
          </a>
        </main>
      )}

      {page !== "signup" && <Footer />}
    </div>
  );
}
