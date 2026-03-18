// Form Tracking
// This file tracks form interactions and submissions

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Track admission form
        trackAdmissionForm();
        
        // Track contact form
        trackContactForm();
    });

    /**
     * Track admission form interactions and submission
     */
    function trackAdmissionForm() {
        const admissionForm = document.getElementById('admission-form');
        
        if (!admissionForm) return;

        // Track form field interactions
        const formFields = admissionForm.querySelectorAll('input, select, textarea');
        formFields.forEach(function(field) {
            // Track field focus
            field.addEventListener('focus', function(e) {
                const fieldData = {
                    event_category: 'form_interaction',
                    event_type: 'field_focus',
                    form_id: admissionForm.id,
                    field_name: this.name,
                    field_id: this.id,
                    field_type: this.type,
                    field_category: this.getAttribute('data-field-type')
                };
                
                trackCustomEvent('admission_field_focus', fieldData);
                console.log('Form field focused:', this.name);
            });

            // Track field blur
            field.addEventListener('blur', function(e) {
                const fieldData = {
                    event_category: 'form_interaction',
                    event_type: 'field_blur',
                    form_id: admissionForm.id,
                    field_name: this.name,
                    field_id: this.id,
                    field_type: this.type,
                    field_value: this.value ? (this.type === 'email' || this.type === 'password' ? '[REDACTED]' : this.value) : '',
                    field_filled: this.value ? true : false
                };
                
                trackCustomEvent('admission_field_blur', fieldData);
                console.log('Form field blurred:', this.name);
            });

            // Track field change
            field.addEventListener('change', function(e) {
                const fieldData = {
                    event_category: 'form_interaction',
                    event_type: 'field_change',
                    form_id: admissionForm.id,
                    field_name: this.name,
                    field_type: this.type,
                    field_category: this.getAttribute('data-field-type')
                };
                
                trackCustomEvent('admission_field_change', fieldData);
                console.log('Form field changed:', this.name);
            });
        });

        // Track form submission
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(admissionForm);
            const submissionData = {
                event_category: 'form_submission',
                event_type: 'admission_form_submit',
                form_id: admissionForm.id,
                form_name: 'admission_form',
                form_fields_count: formData.size,
                education_level: formData.get('education'),
                selected_program: formData.get('program'),
                country: formData.get('country'),
                city: formData.get('city')
            };

            // Track submission
            trackCustomEvent('admission_form_submission', submissionData);
            console.log('Admission form submitted:', submissionData);

            // Show success message and hide form
            admissionForm.style.display = 'none';
            const successMessage = document.getElementById('form-success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Simulate form submission (in production, send to server)
            setTimeout(function() {
                console.log('Form data would be sent to server here');
            }, 1000);
        });
    }

    /**
     * Track contact form interactions and submission
     */
    function trackContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;

        // Track form field interactions
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(function(field) {
            // Track field focus
            field.addEventListener('focus', function(e) {
                const fieldData = {
                    event_category: 'form_interaction',
                    event_type: 'field_focus',
                    form_id: contactForm.id,
                    field_name: this.name,
                    field_id: this.id,
                    field_type: this.type
                };
                
                trackCustomEvent('contact_field_focus', fieldData);
                console.log('Contact form field focused:', this.name);
            });

            // Track field blur
            field.addEventListener('blur', function(e) {
                const fieldData = {
                    event_category: 'form_interaction',
                    event_type: 'field_blur',
                    form_id: contactForm.id,
                    field_name: this.name,
                    field_value: this.value ? (this.type === 'email' ? '[REDACTED]' : this.value) : '',
                    field_filled: this.value ? true : false
                };
                
                trackCustomEvent('contact_field_blur', fieldData);
                console.log('Contact form field blurred:', this.name);
            });

            // Track field change
            field.addEventListener('change', function(e) {
                const fieldData = {
                    event_category: 'form_interaction',
                    event_type: 'field_change',
                    form_id: contactForm.id,
                    field_name: this.name,
                    field_type: this.type
                };
                
                trackCustomEvent('contact_field_change', fieldData);
                console.log('Contact form field changed:', this.name);
            });
        });

        // Track form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(contactForm);
            const submissionData = {
                event_category: 'form_submission',
                event_type: 'contact_form_submit',
                form_id: contactForm.id,
                form_name: 'contact_form',
                form_fields_count: formData.size,
                contact_subject: formData.get('subject')
            };

            // Track submission
            trackCustomEvent('contact_form_submission', submissionData);
            console.log('Contact form submitted:', submissionData);

            // Show success message and hide form
            contactForm.style.display = 'none';
            const successMessage = document.getElementById('contact-success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Simulate form submission
            setTimeout(function() {
                console.log('Contact form data would be sent to server here');
            }, 1000);
        });
    }

})();
