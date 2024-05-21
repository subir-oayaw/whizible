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

function LoginPage() {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showChangePassword, setChangePassword] = useState(false);
  const { t, i18n } = useTranslation();

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

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <Container fluid className="p-0 login-container" style={{ width: "100%", height: "100vh" }}>
      <Row className="w-100 m-0">
        <Dropdown className="position-absolute top-0 start-0 mt-2 ml-3">
          <Dropdown.Toggle variant="success" id="language-dropdown">
            {t("language")}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage("en")}>{t("english")}</Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("fr")}>{t("french")}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>
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
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Winsights Logo"
                className="mb-2 img-fluid"
                style={{ maxWidth: "150px", borderRight: "1px solid #ccc", paddingRight: "10px" }}
              />
              <img
                src={logo1}
                alt="Another Logo"
                className="mb-2 img-fluid"
                style={{ maxWidth: "100px" }}
              />
            </div>
            {showForgotPassword ? (
              <Form onSubmit={handleForgotPassword}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>{t("username_label")}</Form.Label>
                  <Input
                    placeholder={t("enter_username_placeholder")}
                    className="w-100"
                    style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email ID*</Form.Label>
                  <Input
                    placeholder={t("email_placeholder")}
                    className="w-100"
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
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>{t("username_label")}</Form.Label>
                  <Input
                    placeholder={t("enter_username_placeholder")}
                    className="w-100"
                    style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Old Password*</Form.Label>
                  <Input
                    placeholder="*****"
                    className="w-100"
                    style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>New Password*</Form.Label>
                  <Input
                    placeholder="*****"
                    className="w-100"
                    style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Confirm Password*</Form.Label>
                  <Input
                    placeholder="*****"
                    className="w-100"
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
            ) : (
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>{t("username_label")}</Form.Label>
                  <Input
                    placeholder={t("enter_username_placeholder")}
                    className="w-100"
                    style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>{t("password_label")}</Form.Label>
                  <Input
                    type="password"
                    placeholder={t("password_placeholder")}
                    className="w-100"
                    style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                  />
                </Form.Group>
                {loginAttempts > 0 && (
                  <Form.Group controlId="formBasicCaptcha" className="mb-3">
                    <ReCAPTCHA
                      sitekey="your-recaptcha-site-key" // Replace with your actual site key
                      onChange={onCaptchaChange}
                    />
                  </Form.Group>
                )}
                <div className="d-flex justify-content-between mb-4">
                  <Link onClick={() => setChangePassword(true)}>Change Password</Link>
                  <Link onClick={() => setShowForgotPassword(true)}>Forgot Password?</Link>
                </div>
                <FluentButton className="w-100 custom-signin-button" size="large" type="submit">
                  Sign In
                </FluentButton>
              </Form>
            )}
            <div className="d-flex justify-content-between mt-3">
              <Link>{t("two_fa_otp_link")}</Link>
              <Link>{t("master_link")}</Link>
            </div>
            <div className="footer-link mt-auto">
              <a href="https://www.winitiative.com" target="_blank" rel="noopener noreferrer">
                www.winitiative.com
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
