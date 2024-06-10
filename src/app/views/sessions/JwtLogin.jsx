import React, { useState } from "react";
import { Container, Row, Col, Form, Carousel, Dropdown } from "react-bootstrap";
import { Input, Button as FluentButton, Link } from "@fluentui/react-components";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css"; // Assuming your CSS is in LoginPage.css
import logo from "../../../assets/Images/winitiative-logo.svg";
import logo1 from "../../../assets/img/login.svg";
import customerImage from "../../../assets/Images/customer_img.png";
import girlImage from "../../../assets/Images/gril1.png";
import lmsImage from "../../../assets/Images/lms_mandatory.png";
import loginFrameImage from "../../../assets/Images/Loginframe.png";
import developerImage from "../../../assets/Images/developerrr.png";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginPage() {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setChangePassword] = useState(false);
  const [show2FA, set2FA] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [oldPasswordValid, setOldPasswordValid] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameValid(e.target.value.length > 0); // Validation logic for username
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.length >= 8); // Validation logic for password
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // You can implement email validation logic here
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    // You can implement validation logic for old password here
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    // You can implement validation logic for new password here
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // You can implement validation logic for confirm password here
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    // You can implement validation logic for OTP here
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Here you would check the credentials
    const loginSuccess = false; // Replace this with actual login logic

    if (loginSuccess) {
      // Proceed with the successful login
    } else {
      setLoginAttempts((prev) => prev + 1);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  const signin = () => {
    navigate("/dashboard/default");
  };
  const calculatePasswordStrength = () => {
    const strength = {
      0: "Very Weak",
      1: "Weak",
      2: "Fair",
      3: "Strong",
      4: "Very Strong"
    };
    let score = 0;
    // Check password length
    if (password.length >= 8) score++;
    // Check if password contains both lower and uppercase characters
    if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) score++;
    // Check if password contains at least one digit
    if (/(?=.*\d)/.test(password)) score++;
    // Check if password contains at least one special character
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return strength[score];
  };
  const getPasswordStrength = () => {
    const regex = {
      digit: /\d/,
      lowercase: /[a-z]/,
      uppercase: /[A-Z]/,
      special: /[^A-Za-z0-9]/
    };

    let strength = 0;

    if (password.length >= 8) strength++;
    if (regex.digit.test(password)) strength++;
    if (regex.lowercase.test(password)) strength++;
    if (regex.uppercase.test(password)) strength++;
    if (regex.special.test(password)) strength++;

    return strength;
  };
  const getProgressBarColor = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case 0:
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "info";
      case 4:
        return "success";
      default:
        return "danger";
    }
  };
  return (
    <Container fluid className="p-0 login-container" style={{ width: "100%", height: "100vh" }}>
      {/* <Row className="w-100 m-0">
        <Dropdown className="position-absolute top-0 start-0 mt-2 ml-3">
          <Dropdown.Toggle variant="success" id="language-dropdown">
            {t("language")}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage("en")}>{t("english")}</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("f")}>{t("french")}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row> */}
      <Row className="w-100 m-0">
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center text-white p-0"
          style={{
            backgroundImage: "linear-gradient(to top, #2b56a5, #236db7, #2283c8, #2e9ad6, #42b0e3)",
            height: "100vh"
          }}
        >
          <Carousel className="w-100 p-4">
            <Carousel.Item>
              <div className="text-center">
                <div className="image-container">
                  <img
                    src={customerImage}
                    alt="Customer"
                    className="mb-4 img-fluid carousel-image"
                  />
                </div>
                <h3>{t("collaborate_with_cross_teams")}</h3>
                <p>{t("lorem_ipsum")}</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <div className="image-container">
                  <img src={girlImage} alt="Girl" className="mb-4 img-fluid carousel-image" />
                </div>
                <h3>{t("collaborate_with_cross_teams")}</h3>
                <p>{t("lorem_ipsum")}</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <div className="image-container">
                  <img
                    src={lmsImage}
                    alt="LMS Mandatory"
                    className="mb-4 img-fluid carousel-image"
                  />
                </div>
                <h3>{t("collaborate_with_cross_teams")}</h3>
                <p>{t("lorem_ipsum")}</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <div className="image-container">
                  <img
                    src={loginFrameImage}
                    alt="Login Frame"
                    className="mb-4 img-fluid carousel-image"
                  />
                </div>
                <h3>{t("collaborate_with_cross_teams")}</h3>
                <p>{t("lorem_ipsum")}</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <div className="image-container">
                  <img
                    src={developerImage}
                    alt="Developer"
                    className="mb-4 img-fluid carousel-image"
                  />
                </div>
                <h3>{t("collaborate_with_cross_teams")}</h3>
                <p>{t("lorem_ipsum")}</p>
              </div>
            </Carousel.Item>
          </Carousel>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center p-4 mobile-background login-form-container"
        >
          <div className="inner-box">
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <div className="text-center mb-4">
                <img
                  src={logo}
                  alt="Winsights Logo"
                  className="mb-2 img-fluid"
                  style={{ maxWidth: "250px", borderRight: "1px solid #ccc", paddingRight: "10px" }}
                />
                <img
                  src={logo1}
                  alt="Another Logo"
                  className="mb-2 img-fluid"
                  style={{ maxWidth: "250px" }}
                />
              </div>
              {showForgotPassword ? (
                <Form onSubmit={handleForgotPassword}>
                  <Form.Group controlId="formBasicUsername" className="mb-2">
                    <Form.Label>{t("username_label")}</Form.Label>
                    <Input
                      placeholder={t("enter_username_placeholder")}
                      className={`w-100 custom-grey-input ${usernameValid ? "is-valid" : ""}`}
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    {usernameValid && <FaCheckCircle className="text-success" />}{" "}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="mb-2">
                    <Form.Label>Email ID*</Form.Label>
                    <Input
                      placeholder={t("email_placeholder")}
                      className="w-100 custom-grey-input"
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between mb-4">
                    <FluentButton className="custom-signin-button" size="large">
                      Reset
                    </FluentButton>
                    <FluentButton
                      onClick={() => setShowForgotPassword(false)}
                      className="custom-signin-button"
                      size="large"
                      type="submit"
                    >
                      Cancel
                    </FluentButton>
                  </div>
                </Form>
              ) : showChangePassword ? (
                <Form onSubmit={handleForgotPassword}>
                  <Form.Group controlId="formBasicUsername" className="mb-2">
                    <Form.Label>{t("username_label")}</Form.Label>
                    <Input
                      placeholder={t("enter_username_placeholder")}
                      className="w-100 custom-grey-input"
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="mb-2">
                    <Form.Label>Old Password*</Form.Label>
                    <Input
                      placeholder="*****"
                      className="w-100 custom-grey-input"
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="mb-2">
                    <Form.Label>New Password*</Form.Label>
                    <Input
                      placeholder="*****"
                      className="w-100 custom-grey-input"
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                      onChange={handlePasswordChange}
                    />
                    <div className="progress mt-2 custom-progress-bar">
                      <div
                        className={`progress-bar bg-${getProgressBarColor()}`}
                        role="progressbar"
                        style={{ width: `${(getPasswordStrength() / 4) * 100}%` }}
                        aria-valuenow={getPasswordStrength()}
                        aria-valuemin="0"
                        aria-valuemax="4"
                      ></div>
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail" className="mb-2">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Input
                      placeholder="*****"
                      className="w-100 custom-grey-input"
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between mb-4">
                    <FluentButton className="custom-signin-button" size="large">
                      Reset
                    </FluentButton>
                    <FluentButton
                      onClick={() => setChangePassword(false)}
                      className="custom-signin-button"
                      size="large"
                      type="submit"
                    >
                      Cancel
                    </FluentButton>
                  </div>
                </Form>
              ) : show2FA ? (
                <Form onSubmit={handleForgotPassword}>
                  <Form.Group controlId="formBasicUsername" className="mb-2">
                    <Form.Label>{t("Enter_OTP")}</Form.Label>
                    <Input
                      placeholder={t("1234")}
                      className="w-100 custom-grey-input"
                      style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-4">
                    <FluentButton className="custom-signin-button" size="large">
                      Submit
                    </FluentButton>
                    <FluentButton
                      onClick={() => set2FA(false)}
                      className="custom-signin-button"
                      size="large"
                      type="submit"
                    >
                      Cancel
                    </FluentButton>
                  </div>
                </Form>
              ) : (
                <>
                  <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail" className="mb-2">
                      <Form.Label>{t("username_label")}</Form.Label>
                      <Input
                        placeholder={t("enter_username_placeholder")}
                        className="w-100 custom-grey-input"
                        style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-2">
                      <Form.Label>{t("password_label")}</Form.Label>
                      <Input
                        type="password"
                        placeholder={t("password_placeholder")}
                        className="w-100 custom-grey-input"
                        style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                      />
                    </Form.Group>
                    {loginAttempts > 0 && (
                      <Form.Group controlId="formBasicCaptcha" className="mb-2">
                        <ReCAPTCHA
                          sitekey="your-recaptcha-site-key" // Replace with your actual site key
                          // onChange={onCaptchaChange}
                        />
                      </Form.Group>
                    )}
                    <div className="d-flex justify-content-between mb-4">
                      <Link onClick={() => setChangePassword(true)}>Change Password</Link>
                      <Link onClick={() => setShowForgotPassword(true)}>Forgot Password?</Link>
                    </div>
                    <FluentButton
                      className="w-100 custom-signin-button"
                      size="large"
                      type="submit"
                      onClick={() => navigate("/dashboard/default")}
                    >
                      Sign In
                    </FluentButton>
                  </Form>

                  {/* <div className="d-flex justify-content-between mt-3">
                  <Link onClick={() => set2FA(true)}>{t("two_fa_otp_link")}</Link>
                  <Link>{t("master_link")}</Link>
                </div> */}
                </>
              )}
              <div className="footer-link">
                <a href="https://www.winitiative.com" target="_blank" rel="noopener noreferrer">
                  www.winitiative.com
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
