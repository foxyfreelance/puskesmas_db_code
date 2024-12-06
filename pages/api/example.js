export default function handler(req, res) {
  res.status(200).json({ message: new Date().getTime(), data: req.query.number });
}
