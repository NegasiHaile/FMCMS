## JuPiTeR-FMCMS

# Jupiter trading Fiscal Machine Controlling and Managment System

## Sample Screenshots

1, Login Page = https://user-images.githubusercontent.com/60927507/149326156-cbeff779-52e3-4b06-a7c8-aa75b2d4ab1d.png
2, Machine Detaile = https://user-images.githubusercontent.com/60927507/149324901-e408c4c6-33c2-4f9b-99ed-931dfb77c134.png

# Fiscal Machine Controlling and Management System (FMCMS)

## System users

1. Super Admin (Who initiates the system)
2. Main Store (Manage overall machines)
3. Branch Admin (Control branch activities)
4. Operation Manager (Manage branch sales operations)
5. Branch Store (Manage branch machines)
6. Sales (Sale machines and Prepare sales documentation)
7. Machine Controller (Manage client’s machines)
8. Technician (Macke maintenance and fiscalization)
9. Customer Service (Deliver machines)

## Sub systems

1. Machine Sale
2. Machine Maintenance
3. Machine withdrawal
4. Mailing system

## Functionalities

1. Create Branch
2. Add employee (Register new employee and push to one of the branches).
3. Add (Register) new imported Machines, MRC, SIM Details in main branch.
4. Distribute these registered Machines, MRCs, SIM cards from main branch to sub branches.
5. Accept (confirm) new arrival machines and SIM cards in sub branch distributed from the main branch.
6. Assign (attach) MRC and SIM to a machine
7. Add clients (business owners) details
8. Register the client business detail.
9. Assign (attach) machines to the business (Prepare sales document).
10. Request the sales document to Operational manager for approval.
11. Approve the sales documentation and request to branch store for machine readiness
12. Assign technician to the machine who can make the fiscalization.
13. Request to technician for fiscalization
14. Request fiscalized machine back to machine controller
15. Request to customer service for delivery
16. Confirm delivery and print delivery note (Sales end point)
17. Receive client machine
18. Request received machine to machine controller for:
    a. Maintenance
    b. Temporary Store
    c. Withdrawal

A. Maintenance

- Assign Technician
- Request to technician for maintenance
- Request maintained machine back to machine controller
- Request to customer service for delivery
- Confirm machine delivery and print delivery (make agreement with business contact person) (Maintenance end point)
  B. Temporary Store
- Request to branch store for machine temporary storing.
- Request back to machine controller for delivery
- Request to customer service for delivery
- Confirm machine delivery and print delivery note (Make agreement with business contact person)
  (Temporary store end point)
  C. Withdrawal
- Request to machine controller for submitting the machine
- Request machine to branch store for restoring
- Confirm restore machine
  (Withdrawal end point)

## Non-Functional

### User Account

      2, Account activate and deactivate
      3, Forget Password and Reset Password using emailing system.
      4, Password Change

### Mail System

      1, Add email
      2, Verify email
      3, Make the email primary
      4, Make the email openable from any app
      3, Close the reCAPTCHA system

## NB: Now email is ready to send emails to users during reset password and registration.

# Users Privileges

1. Super Admin

- Manage Branches
  • Create, update branch
  • See branches detail, Dashboard and Activities.
- Manage users Account
  • Add employee (user) and push to sub branch
  • Activates and Deactivates user account
- Manages system email: - When a user forget password a password reset link must be sent to the user email. And there should be an email used to send the link. So, this is the system email which is used to send a message on behalf of Jupiter trading. Then the following privileges are under this user: -
  • Add new email
  • Verify email
  • Make email as a primary email of the system
  • Change primary email of the system

2. Main Store

- Manages Machine (
  o Register,
  o Update
  o And delete new imported machines
  o Distribute machines to sub-branches)
- Manages SIM Cards (
  o Register,
  o Update
  o And delete new imported SIM cards
  o Distribute SIM cards to sub-branches
- Manages MRC (
  o Register,
  o Update
  o And delete new imported SIM cards
  o Distribute SIM cards to sub-branches

3. Branch Admin

- Control branch activities
- Activate and deactivate branch users

4. Operational Department

- Approvement of sales (Read the sales documentation and approve sales)
- See branch sales and maintenance analysis

5. Branch Store

- Accept new arrivals (Machine and SIM cards)
- Attach SIM card and MRC with machines
- Request machine for fiscalization
- Accept restore machines
- See machines report (Sold, Unsold and Processing)

6. Sales

- Create account for client
- Encode business details of the client
- Attach machines to the business
- Request to operational manager for sales approvement
- See yearly and monthly branch sales report

7. Machine Controller

- Control Client Machines
  o Control machines came for maintenance and request them to technician for maintenance.
  o Control machines came for withdrawal and request to branch store for restoring.
  o Control machines which are ready for delivery and request them to customer service for delivery

8. Technician

- Fiscalize machine and request to machine controller
- Receive client machines come for maintenance
- Make maintenance to the machines and request back for machine controller

9. Customer Service

- Assign technician to machine for fiscalization and maintenance
- Confirm machine delivery
- Print machine delivery note and make agreement with business contact person (machine owner).
