const CatalogFeedback = require('../models/catalogFeedbackModel')

exports.createFeedback = (req, res) => {
    const catalogId = req.params.id
    const payload = req.body
    payload.catalog_id = catalogId
    CatalogFeedback.createCatalogFeedback(payload, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: 'success create feedback' });
    });
}