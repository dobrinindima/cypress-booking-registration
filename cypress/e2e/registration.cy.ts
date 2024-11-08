describe('User Registration', () => {
    it('should be registered', () => {
        const randomDigit = Math.floor(1000 + Math.random() * 9000);
        const email = `dobrinindima+${randomDigit}@gmail.com`;

        cy.visit('/');
        cy.get('[role="dialog"] a').click();
        cy.get('#username').type(email);
        cy.get('[type="submit"]').click();
        cy.get('#new_password').type('myStrongPass123');
        cy.get('#confirmed_password').type('myStrongPass123');
        cy.get('[type="submit"]').click();
        cy.contains("Let's make sure you're human");
    });

    it('should be validation error for empty Email field'), () => {
        cy.visit('/');
        cy.get('[aria-label="Dismiss sign-in info."]').click();
        cy.get('[data-testid="header-sign-up-button"]').click();
        cy.get('[type="submit"]').click();
        cy.get('#username-note').should('be.a', 'Enter your email address');
    };

    it('should be validation error for empty Password and Confirm password fields'), () => {
        const randomDigit = Math.floor(1000 + Math.random() * 9000);
        const email = `dobrinindima+${randomDigit}@gmail.com`;

        cy.visit('/');
        cy.get('[role="dialog"] a').click();
        cy.get('#username').type(email);
        cy.get('[type="submit"]').click();
        cy.get('[type="submit"]').click();

        cy.get('#new_password-note').should('be.a', 'Please enter your new password');
        cy.get('#confirmed_password-note').should('be.a', 'Confirm your password');
    };
});
