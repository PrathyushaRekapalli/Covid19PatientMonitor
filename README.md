# Covid19PatientMonitor

A web application that is capable of monitoring the health status of isolated quarantined patients, remotely by doctors.
The ideal version would send patient information to doctors, as read from any monitoring devices (pulse oximeter,heart rate monitor, etc.)
This application runs a simulation of mocked data, such that whenever a patients readings fluctuate out of the safe health range, a live alert
would be sent to the doctors monitoring  said patients.

Frontend implemented using HTML,CSS, and React JS
Backend implemented using a Java REST API and ofcourse an SQL database

## USER PROFILES
Includes separate UI modules for :
<ul>
<li>Patient</li>
<li>Doctor</li>
<li>Admin</li>
</ul>

## USER PROFILE DESCRIPTION
<p>
Patients must sign up, and once they are registered by a doctor or administrator they can view their vital health information through the patient portal.
Doctors are registered under the admin portal. They can :
<ul>
<li>Register Patients under them, if they have created accounts</li>
<li>View a list of registered patients under the current doctor account</li>
<li>View the vital health information of registered patients</li>
<li>View patient health fluctuation alerts (if any), under the alerts tab</li>
</ul>
Administrators for the sake of this simulation are assumed to already have accounts created
They are capable of adding,updating or deleting both patient and doctor profiles <br><br>

**Administrator Information:**
<ul>
<li>id: ADMIN123</li>
<li>Name: admin</li>
<li>email: admin@admin.com</li>
<li>password: admin@123</li>
</ul>
</p>

## SETUP
You will need
<ul>
<li>HTML 5, CSS 3, Node - to run React JS</li>
<li>Java JRE & JDK</li>
<li>Apache Tomcat 8.5</li>
<li>MY SQL version 8.0.21</li>
<li>Eclipse IDE for Enterprise Java Developers</li>
</ul>



## RUN
**Application**<br>
Use <code>npm start</code> to start the application

(You can change the host url in react/src/App.js Line 18)
<br>
<br>
**Server**<br>
Open Eclipse IDE under the workspace "Covid19PatientMonitor/java":

<ul>
<li>Run Project covid19_patient_monitor on server (Apache Tomcat 8.5) by Right-clicking covid19_patient_monitor > Run As > Run On Server </li>

<li>Run Simulation by going to Project Simulation/Java Resources/src/test and Right-clicking test.java> Run As > Java Application
(Run Simulation only after three patients have been registered under doctor)</li>
</ul><br>

Hits:
[![HitCount](http://hits.dwyl.com/Sumo-99/Covid19PatientMonitor.svg)](http://hits.dwyl.com/Sumo-99/Covid19PatientMonitor)

<hr>
