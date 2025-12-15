exports.submitContact = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ success: true });
};
