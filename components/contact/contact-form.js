import { useEffect, useRef, useState } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message, "Something went wrong!");
  }
}

function ContactForm() {
  const enteredEmail = useRef();
  const enteredName = useRef();
  const enteredMessage = useRef();
  const [requestStatus, setRequestStatus] = useState(); // "pending", "success", "error"
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus, requestError]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    const data = {
      email: enteredEmail.current.value,
      name: enteredName.current.value,
      message: enteredMessage.current.value,
    };

    setRequestStatus("pending");

    try {
      await sendContactData(data);
      setRequestStatus("success");
      enteredEmail.current.value = "";
      enteredName.current.value = "";
      enteredMessage.current.value = "";
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message send successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Success!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" required ref={enteredEmail} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" required ref={enteredName} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            ref={enteredMessage}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
