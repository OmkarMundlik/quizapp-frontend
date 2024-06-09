import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ContactUs() {
    const [state, handleSubmit] = useForm("xayrrwbe");
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            setSubmitted(true);
            return;
        }
        setSubmitted(false);
        await handleSubmit(e);
    };

    if (state.succeeded) {
        return (
            <div className="alert alert-success" role="alert">
                Thanks for joining!
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <h1 className="text-center mb-4">Contact Us</h1>
                {submitted && (
                    <div className="alert alert-danger" role="alert">
                        Please fill out all fields.
                    </div>
                )}
                <p className="text-center font-weight-bold mb-4" style={{ fontSize: '18px', color: 'black' }}>If you have any questions or queries about Spardhaweb, don't hesitate to reach out! Whether you need clarification on our services, assistance with navigating our platform, or simply want to learn more about what we offer, we're here to help. Feel free to contact us using the form below, and our team will get back to you as soon as possible. Your satisfaction and understanding are our top priorities, and we're committed to providing you with the support you need. Let's connect and address any inquiries you may have about us!</p>
                <form onSubmit={onSubmit} className="border p-4 shadow-sm rounded" noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Your email"
                            required
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                            className="text-danger"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            rows="4"
                            placeholder="Your message"
                            required
                        />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                            className="text-danger"
                        />
                    </div>
                    <button type="submit" disabled={state.submitting} className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>

            </div>
            <Footer />
        </div>
    );
}

export default ContactUs;
