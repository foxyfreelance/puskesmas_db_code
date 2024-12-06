export default function handler(req, res) {
  res.status(200).json({ message: new Date().getTime() });
}