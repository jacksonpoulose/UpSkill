
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user._id,
      userRole: req.user.role
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user._id,
      userRole: req.user.role,
      read: false,
    });

    res.json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const postNotification = async (req, res) => {
  const { userId, userRole, message, type } = req.body;

  try {
    const newNotification = new Notification({
      userId,
      userRole,
      message,
      type
    });
    await newNotification.save();

    res.status(201).json({ message: "Notification added successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getNotifications,
  postNotification,
  getUnreadCount
};
