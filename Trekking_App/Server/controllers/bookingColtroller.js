import TrekkingPackage from '../models/TrekkingPackage.js';

import userModel from '../models/User.js'; // Assuming user authentication

const addTrekkingPackage = async (req, res) => {
    try {
        const { title, description, price, daysRequired, rating, difficultyLevel, maxGroupSize, bestSeason, includedServices, excludedServices, location } = req.body;
       
        // Check if the request is from an authorized user
        const userId = req.user?.id; // Assuming user info comes from middleware
        if (!userId) {
            return res.status(401).json({ success: false, message: "User authentication required." });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Validate required fields
        if (!title || !description || !price || !daysRequired || !difficultyLevel || !maxGroupSize || !bestSeason || !location) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Upload images to Cloudinary if provided
        let imageUrls = [];
        if (imageFiles && imageFiles.length > 0) {
            try {
                const uploadPromises = imageFiles.map(file => cloudinary.uploader.upload(file.path, { resource_type: "image" }));
                const uploadedImages = await Promise.all(uploadPromises);
                imageUrls = uploadedImages.map(img => img.secure_url);
            } catch (uploadError) {
                console.error("Error uploading images to Cloudinary:", uploadError);
                return res.status(500).json({ success: false, message: "Image upload failed. Please try again." });
            }
        }

        // Format itinerary data
        const formattedItinerary = itinerary ? JSON.parse(itinerary).map((day, index) => ({
            day: index + 1,
            description: day.description,
        })) : [];

        // Create a new trekking package
        const trekkingPackageData = {
            title,
            description,
            price,
            daysRequired,
            rating: rating || 0,
            difficultyLevel,
            maxGroupSize,
            bestSeason,
            includedServices: includedServices ? includedServices.split(',') : [],
            excludedServices: excludedServices ? excludedServices.split(',') : [],
            itinerary: formattedItinerary,
            location,
            images: imageUrls,
            createdAt: Date.now(),
        };

        const newTrekkingPackage = new TrekkingPackage(trekkingPackageData);
        await newTrekkingPackage.save();

        res.status(201).json({
            success: true,
            message: "Trekking package added successfully.",
            trekkingPackage: newTrekkingPackage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the trekking package.",
            error: error.message
        });
    }
};

export default addTrekkingPackage;
