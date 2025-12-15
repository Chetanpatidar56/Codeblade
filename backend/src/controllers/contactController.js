const Contact = require('../models/Contact');

const submitContact = async (req, res) => {  // ← Add 'const'
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully',
      data: contact 
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit contact form',
      error: error.message 
    });
  }
};

module.exports = { submitContact };  // ← Export as object with curly braces
