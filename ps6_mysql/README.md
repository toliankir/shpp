**REQUIREMENT**
      123
Any http server with PHP ver.7 support. For example XAMPP. 

https://www.apachefriends.org/ru/index.html

MySql database, any actual version.

https://dev.mysql.com/doc/refman/8.0/en/installing.html

**INSTALLATION**

Copy files in your http server home folder. 

Import mysql/dump.sql to your base. 

Set writable permission to files:

    log/error.log
    log/event.log

Change mysql configuration in config/mysqlConfig.php

Entry point is /public/index.html

**Mysql base structure**

- users_table

| Field    | Type         | Null | Key | Default | Extra          |
|----------|--------------|------|-----|---------|----------------|
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| login    | varchar(128) | NO   | UNI | NULL    |                |
| password | varchar(128) | NO   |     | NULL    |                |
    
- messages_table

| Field     | Type      | Null | Key | Default           | Extra          |
|-----------|-----------|------|-----|-------------------|----------------|
| id        | int(11)   | NO   | PRI | NULL              | auto_increment |
| userId    | int(11)   | NO   |     | NULL              |                |
| timestamp | timestamp | NO   |     | CURRENT_TIMESTAMP |                |
| message   | text      | NO   |     | NULL              |                |

**API**

Api entry point is public/api/index.php

**API REQUESTS**

- Login request

    post variables:
    
        login - User login
        password - User Password
    method: POST
    
    If user dose not exist this request creates it.
    
- Logout
    post variables:

        logout
    method: POST
    
    Logout current user.
    
- Post message
    
    post variables:
    
        message - Message from current user
   
   method: POST
   
   Add message to chat database. User must to login.
   
- Get messages
    
    get variables:
    
        id - Message id after which you need to get data.
        
    method: GET
        
    You may only get data not older than time period in server configuration.
