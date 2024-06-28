Take home project for hacktues IT role application 


# CONTENT

- ## Zadachi (here is the code for the project)

- ## Practical Tests (here are tests for problems i have experienced in the past 3 years in the hacktues` websites and they show that its no longer a problem)
    - mentor choosing not maintaining order (e.g. a mentor was selected but it failed and now another person have stolen it)

    - login/signup dont work cuz of high traffic


# Implmetatioin details and why i chose them:
- t-shirt-service works with a message queue -> helpful for preserving the orders in chronological order ( something which was quite buggy in hacktues 10 due to high traffic and a person could try to reserve a mentor and aonther to do it too, this way whoever orders him first gets him first)
- login/signup has a load balancer -> there is a very high traffic in the first day of hacktues and we want availability after this it can be easily scaled down