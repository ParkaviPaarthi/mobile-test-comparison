# Shared scenarios (identical across tools)
App: MobileCompare (`com.mobilecompare.app`), valid user `test@example.com` / `Password123!`.
## S1 Login
1. Launch app (fresh state) -> `login-screen` visible
2. Type credentials, tap `login-button` -> `welcome-text` visible
## S2 Add to cart + S3 Logout
1. Logged in, tap `add-to-cart-button` -> `cart-badge` shows "1"
2. Tap `logout-button` -> `login-screen` visible
## S4 Invalid login
1. Wrong password -> `error-message` / "Invalid credentials" visible
