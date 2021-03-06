define({ "api": [
  {
    "type": "get",
    "url": "/api/me/children",
    "title": "GetUserChildren",
    "name": "GetUserChildren",
    "group": "API",
    "description": "<p>Get current User&#39;s children Requires the user to have a valid token.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/api/me",
    "title": "GetUserInformation",
    "name": "GetUserInformation",
    "group": "API",
    "description": "<p>Get token user information. Requires the user to have a valid token.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "get",
    "url": "/api/me/route",
    "title": "GetUserRouteInformation",
    "name": "GetUserRouteInformation",
    "group": "API",
    "description": "<p>Get token route information. Requires the user to have a valid token.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "post",
    "url": "/api/me/route",
    "title": "UpdateUserRoute",
    "name": "UpdateRoute",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ETA",
            "description": "<p>Estimated Time to Arrival</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "distance",
            "description": "<p>Distance to the School in meters.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A message to the School</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "latitude",
            "description": "<p>User current Latitude</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "longitude",
            "description": "<p>User current Longitude</p> "
          }
        ]
      }
    },
    "description": "<p>Get token route information and udpdates it. Requires the user to have a valid token.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "post",
    "url": "/api/me/position",
    "title": "UpdateUserPosition",
    "name": "UpdateUserPosition",
    "group": "API",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "latitude",
            "description": "<p>User current Latitude</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "longitude",
            "description": "<p>User current Longitude</p> "
          }
        ]
      }
    },
    "description": "<p>Get token user&#39;s current position and updates it. Requires the user to have a valid token.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "API"
  },
  {
    "type": "put",
    "url": "/children",
    "title": "CreateChildren",
    "name": "CreateChildren",
    "group": "Children",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Children name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "class",
            "description": "<p>Children class</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "age",
            "description": "<p>Children age</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Children picture</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Children status</p> "
          }
        ]
      }
    },
    "description": "<p>Create a Children on the database.</p> ",
    "version": "0.0.0",
    "filename": "routes/children.js",
    "groupTitle": "Children"
  },
  {
    "type": "put",
    "url": "/children/user/:id",
    "title": "CreateChildrenAndAssociateToUser",
    "name": "CreateChildrenAndAssociateToUser",
    "group": "Children",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Children name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "class",
            "description": "<p>Children class</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "age",
            "description": "<p>Children age</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Children picture</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Children status</p> "
          }
        ]
      }
    },
    "description": "<p>Create a Children on the database and associates it to an user</p> ",
    "version": "0.0.0",
    "filename": "routes/children.js",
    "groupTitle": "Children"
  },
  {
    "type": "delete",
    "url": "/children/:id",
    "title": "DeleteChildren",
    "name": "DeleteChildren",
    "group": "Children",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Children id</p> "
          }
        ]
      }
    },
    "description": "<p>Deletes a Children from the database.</p> ",
    "version": "0.0.0",
    "filename": "routes/children.js",
    "groupTitle": "Children"
  },
  {
    "type": "get",
    "url": "/children",
    "title": "FindAllChildren",
    "name": "FindAllChildren",
    "group": "Children",
    "description": "<p>Finds all the children on the database</p> ",
    "version": "0.0.0",
    "filename": "routes/children.js",
    "groupTitle": "Children"
  },
  {
    "type": "get",
    "url": "/children/:id",
    "title": "FindChildrenById",
    "name": "FindChildrenById",
    "group": "Children",
    "description": "<p>Finds a Children by its unique identifier</p> ",
    "version": "0.0.0",
    "filename": "routes/children.js",
    "groupTitle": "Children"
  },
  {
    "type": "post",
    "url": "/children/:id",
    "title": "UpdateChildren",
    "name": "UpdateChildren",
    "group": "Children",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Children id</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Children name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "class",
            "description": "<p>Children class</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "age",
            "description": "<p>Children age</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>Children picture</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Children status</p> "
          }
        ]
      }
    },
    "description": "<p>Updates a Children.</p> ",
    "version": "0.0.0",
    "filename": "routes/children.js",
    "groupTitle": "Children"
  },
  {
    "type": "put",
    "url": "/classroom",
    "title": "CreateClassroom",
    "name": "CreateClassroom",
    "group": "Classroom",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The classroom name.</p> "
          }
        ]
      }
    },
    "description": "<p>Create a new Classroom</p> ",
    "version": "0.0.0",
    "filename": "routes/classroom.js",
    "groupTitle": "Classroom"
  },
  {
    "type": "get",
    "url": "/classroom",
    "title": "FindAllClassrooms",
    "name": "FindAllClassrooms",
    "group": "Classroom",
    "description": "<p>Finds all Classrooms on the database</p> ",
    "version": "0.0.0",
    "filename": "routes/classroom.js",
    "groupTitle": "Classroom"
  },
  {
    "type": "get",
    "url": "/classroom",
    "title": "FindClassroomDepartureTimes",
    "name": "FindClassroomDepartureTimes",
    "group": "Classroom",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Classroom id</p> "
          }
        ]
      }
    },
    "description": "<p>Finds all departure time from a requested Classroom</p> ",
    "version": "0.0.0",
    "filename": "routes/classroom.js",
    "groupTitle": "Classroom"
  },
  {
    "type": "post",
    "url": "/departure_time/:departureId/classroom/:classroomId",
    "title": "AssociateDepartureTimeClassroom",
    "name": "AssociateDepartureTimeClassroom",
    "group": "DepartureTime",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "departureId",
            "description": "<p>Departure time id</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "classroomId",
            "description": "<p>Classroom id</p> "
          }
        ]
      }
    },
    "description": "<p>Associates a DepartureTime with a Classroom</p> ",
    "version": "0.0.0",
    "filename": "routes/departure.js",
    "groupTitle": "DepartureTime"
  },
  {
    "type": "put",
    "url": "/departure_time",
    "title": "CreateDepartureTime",
    "name": "CreateDepartureTime",
    "group": "DepartureTime",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "time",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Creates a new Departure Time</p> ",
    "version": "0.0.0",
    "filename": "routes/departure.js",
    "groupTitle": "DepartureTime"
  },
  {
    "type": "get",
    "url": "/departure_time",
    "title": "FindAllDepartureTimes",
    "name": "FindAllDepartureTimes",
    "group": "DepartureTime",
    "description": "<p>Finds all departure times currently on database.</p> ",
    "version": "0.0.0",
    "filename": "routes/departure.js",
    "groupTitle": "DepartureTime"
  },
  {
    "type": "get",
    "url": "/departure_time/:id",
    "title": "FindDepartureTimeById",
    "name": "FindDepartureTimeById",
    "group": "DepartureTime",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>Departure time id</p> "
          }
        ]
      }
    },
    "description": "<p>Finds departure time by id</p> ",
    "version": "0.0.0",
    "filename": "routes/departure.js",
    "groupTitle": "DepartureTime"
  },
  {
    "type": "post",
    "url": "/school/:schoolId/users/:userId",
    "title": "AssociateUserToSchool",
    "name": "AssociateUserToSchool",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "schoolId",
            "description": "<p>The school id</p> "
          }
        ]
      }
    },
    "description": "<p>Associates an User to a School</p> ",
    "version": "0.0.0",
    "filename": "routes/school.js",
    "groupTitle": "School"
  },
  {
    "type": "get",
    "url": "/school/:schoolId/distance/:latitude/:longitude",
    "title": "CalculateDistanceToSchool",
    "name": "CalculateDistanceToSchool",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "latitude",
            "description": "<p>The latitude to compare.</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "longitude",
            "description": "<p>The longitude to compare.</p> "
          }
        ]
      }
    },
    "description": "<p>Compares the school position to a pair of latLng and returns the distance in kilometers.</p> ",
    "version": "0.0.0",
    "filename": "routes/school.js",
    "groupTitle": "School"
  },
  {
    "type": "get",
    "url": "/school/distance/:latitude/:longitude",
    "title": "CalculateDistanceToSchool",
    "name": "CalculateDistanceToSchool",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "latitude",
            "description": "<p>The latitude to compare.</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "longitude",
            "description": "<p>The longitude to compare.</p> "
          }
        ]
      }
    },
    "description": "<p>Compares the school position to a pair of latLng and returns the distance in kilometers.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "School"
  },
  {
    "type": "put",
    "url": "/school",
    "title": "CreateSchool",
    "name": "CreateSchool",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          }
        ]
      }
    },
    "description": "<p>Creates a new School</p> ",
    "version": "0.0.0",
    "filename": "routes/school.js",
    "groupTitle": "School"
  },
  {
    "type": "get",
    "url": "/school/:id/users",
    "title": "GetSchoolUsers",
    "name": "GetSchoolUsers",
    "group": "School",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>The school id</p> "
          }
        ]
      }
    },
    "description": "<p>Get all users from a School</p> ",
    "version": "0.0.0",
    "filename": "routes/school.js",
    "groupTitle": "School"
  },
  {
    "type": "put",
    "url": "/user/",
    "title": "CreateUser",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The User&#39;s name</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>The User&#39;s username</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The User&#39;s password</p> "
          }
        ]
      }
    },
    "description": "<p>Creates a new User</p> ",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/",
    "title": "FindAllUsers",
    "name": "FindAllUsers",
    "group": "User",
    "description": "<p>Finds all Users currently on database</p> ",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "FindUserById",
    "name": "FindUserById",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User identifier</p> "
          }
        ]
      }
    },
    "description": "<p>Finds User by its unique identifier.</p> ",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username in plain text</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password in plain text</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "     HTTP/1.1 200 OK\n     {\n         \"token\": \"JWTTOKEN\"\n     }",
          "type": "json"
        }
      ]
    },
    "description": "<p>Exchange username and password for a JWT Token</p> ",
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users_on_route/user/:id",
    "title": "CreateAndAssociateToUser",
    "name": "CreateAndAssociateToUser",
    "group": "UserOnRoute",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User identifier</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ETA",
            "description": "<p>Estimated Time to Arrival</p> "
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "distance",
            "description": "<p>Distance to the School in meters.</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A message to the School</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "latitude",
            "description": "<p>User current Latitude</p> "
          },
          {
            "group": "Parameter",
            "type": "Float",
            "optional": false,
            "field": "longitude",
            "description": "<p>User current Longitude</p> "
          }
        ]
      }
    },
    "description": "<p>Create a departure time and associates it to an User</p> ",
    "version": "0.0.0",
    "filename": "routes/user_on_route.js",
    "groupTitle": "UserOnRoute"
  },
  {
    "type": "get",
    "url": "/users_on_route/:id",
    "title": "FindUsersOnRoute",
    "name": "FindUsersOnRoute",
    "group": "UserOnRoute",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User identifier</p> "
          }
        ]
      }
    },
    "description": "<p>Finds all Users currently on Route</p> ",
    "version": "0.0.0",
    "filename": "routes/user_on_route.js",
    "groupTitle": "UserOnRoute"
  }
] });