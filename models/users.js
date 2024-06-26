const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - citizenshipNo
 *         - password
 *         - dateOfBirth
 *       properties:
 *         username:
 *           type: string
 *           description: User's username
 *         firstName:
 *           type: string
 *           description: User's first name
 *         middleName:
 *           type: string
 *           description: User's middle name
 *           default: null
 *         lastName:
 *           type: string
 *           description: User's last name
 *         email:
 *           type: string
 *           description: User's email address
 *           default: abc@example.com
 *         phone:
 *           type: number
 *           description: User's phone number
 *           default: 0
 *         citizenshipNo:
 *           type: string
 *           description: User's citizenship number
 *           default: 00-00-00-00000
 *         password:
 *           type: string
 *           description: User's password
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: User's date of birth
 *           default: 0000-00-00
 */

// define User schema
const userSchema = new Schema({
  // Personal information
  username: { 
    type: String, 
    required: true, 
    unique: true
  },
  role: {
    type: String,
    required: true,
    default: "Resident"
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 20
  },
  middleName: {
    type: String,
    default: null,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true
  },
  citizenshipNo: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  dateOfBirth: {
    type: Date,
    required: true
  },  
  staffId: {
    type: Number,
    default: null
  },
  joinedDate: {
    type: Date,
    required: true
  },
  
  // Billing information
  billing: {
    nextPayDate: {
      type: Date,
      default: null
    },
    amount: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      default: null
    },
    pastBills: [{
      paidDate: {
        type: Date,
        default: null
      },
      amount: {
        type: Number,
        default: null
      }
    }]
  } 
},
{collection:"Users"}
);

// create and export User model based on the schema
const User = mongoose.model('User', userSchema);

// function to insert admin detail into the database by default
async function insertAdminDetail() {
  try {
    const adminExists = await User.findOne({ role: "Admin" });
    if (!adminExists) {
      const admin = new User({
        username: "admin",
        role: "Admin",
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@gmail.com",
        phone: 9876543210,
        citizenshipNo: "12-345-6789",
        password: "admin123",
        dateOfBirth: "2000-01-01",
        joinedDate: new Date()
      });
      await admin.save();
      console.log("Admin detail inserted successfully.");
    } else {
      console.log("Admin already exists in the database.");
    }
  } catch (error) {
    console.error("Error inserting admin detail:", error);
  }
}

// call the function to insert admin detail.
insertAdminDetail();

module.exports = User;