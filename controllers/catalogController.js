
const Catalog = require('../models/catalogModel')

exports.createCatalog = (req, res) => {
    const newCatalog = req.body;
    Catalog.createCatalog(newCatalog, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(201).json(newCatalog);
    });
}

exports.getAllCatalog = (req, res) => {
    Catalog.getAllCatalog((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(result);
    });
}