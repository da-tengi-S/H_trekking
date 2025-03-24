

import TrekkingPackage from '../models/packageModel.js';
export const addTrekkingPackage = async (req, res) => {
    try {
        const { 
            title, description, price, daysRequired, 
            rating, difficultyLevel, maxGroupSize, bestSeason, 
            includedServices, excludedServices, location 
        } = req.body;
        
        // Validate required fields
        if (!title || !description || !price || !daysRequired || 
            !difficultyLevel || !maxGroupSize || !bestSeason || !location) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Ensure includedServices and excludedServices are arrays
        const trekkingPackageData = {
            title,
            description,
            price,
            daysRequired,
            rating: rating || 0,
            difficultyLevel,
            maxGroupSize,
            bestSeason,
            includedServices: Array.isArray(includedServices) ? includedServices : [],
            excludedServices: Array.isArray(excludedServices) ? excludedServices : [],
            location,
        };

        const newTrekkingPackage = new TrekkingPackage(trekkingPackageData);
        await newTrekkingPackage.save();

        res.status(201).json({
            success: true,
            message: "Trekking package added successfully.",
            trekkingPackage: newTrekkingPackage
        });
    } catch (error) {
        console.error("Error adding trekking package:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the trekking package.",
            error: error.message
        });
    }
};

