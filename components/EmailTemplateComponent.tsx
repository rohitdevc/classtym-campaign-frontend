"use client"

export default function EmailTemplateComponent() {
  const basePath = process.env.NEXT_PUBLIC_PATH;

  return (
    <>
    <main>
      <a href="https://app.classtym.com/">
        <img src={`${basePath}images/logo.png`} alt="ClassTym logo" style={{width: '62px', position: 'absolute', top: '1.25rem', left: '1.25rem'}} />
      </a>
      <a href="https://app.classtym.com/" style={{marginInline: 'auto'}}>
        <img src={`${basePath}images/email-template/classtym-icon.svg`} alt="ClassTym Icon" style={{width: '82px'}} />
      </a>
      <div className="email_body">
        <h1>Welcome to ClassTym 🎉</h1>
        <p className="welcome_msg">
          Please click on <b>Get Started</b> to access your ClassTym account.
          <br />
          For full access to <b>scheduling and all platform features</b>, kindly use a <b>laptop or desktop</b>.
        </p>
        <div className="get_started">
          <a href="https://app.classtym.com/" style={{backgroundColor: '#E43955', color: 'white', fontSize: '16px', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', width: '157px', height: '51px', borderRadius: '10px' }}>
            <span>Get Started</span>
            <img src={`${basePath}images/email-template/right-arrow.svg`} />
          </a>
        </div>
      </div>
      <ul className="benefits">
        <li>
          <img src={`${basePath}images/email-template/instant-classroom.svg`} alt="Instant Classroom" />
          <span>Instant Classroom</span>
        </li>
        <li>
          <img src={`${basePath}images/email-template/one-on-one-session.svg`} alt="One on One Session"/>
          <span>1:1 Session</span>
        </li>
        <li>
          <img src={`${basePath}images/email-template/group-classes.svg`} alt="Group Classes"/>
          <span>Group Classes</span>
        </li>
        <li>
          <img src={`${basePath}images/email-template/live-courses.svg`} alt="Live Courses"/>
          <span>Live Courses</span>
        </li>
      </ul>
      <div className="social_media">
        <h3>Follow us</h3>
        <ul>
          <li>
            <a href="https://www.linkedin.com/company/classtym/"><img src={`${basePath}images/email-template/linked-in.svg`} alt="Linked In" style={{width: '24px'}} /></a>
          </li>
          <li>
            <a href="https://www.instagram.com/classtym_/"><img src={`${basePath}images/email-template/instagram.svg`} alt="Instagram" style={{width: '16px'}} /></a>
          </li>
          <li>
            <a href="https://www.facebook.com/profile.php?id=61568508999980"><img src={`${basePath}images/email-template/facebook.svg`} alt="Facebook" style={{width: '7px'}} /></a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCHTvDrarwY0Eh-MMxmtcV7Q/featured"><img src={`${basePath}images/email-template/youtube.svg`} alt="YouTube" style={{width: '18px'}} /></a>
          </li>
        </ul>
      </div>
      <footer style={{textAlign: 'center'}}>
        <p style={{color: '#424242', fontSize: '12px'}}>For any assistance, please contact us at <a href="mailto:info@classtym.com" style={{color: '#507FCB'}}>info@classtym.com</a></p>
        <ul>
          <li>
            <a href="https://www.classtym.com/privacy-policy">Privacy Policy</a>
          </li>
          <li>|</li>
          <li>
            <a href="https://www.classtym.com/terms-and-conditions">Terms & Conditions</a>
          </li>
        </ul>
      </footer>
    </main>
    </>
  );
}