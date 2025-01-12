const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Route to handle numerology predictions
router.post("/", async (req, res) => {
    const { name, birthdate } = req.body;

    // Validate name to only allow letters (no numbers, special characters)
    const namePattern = /^[A-Za-z]+$/;  // Regex to allow only alphabets
    if (!name || !namePattern.test(name)) {
        return res.status(400).json({ error: "Invalid name. Please enter a valid name containing only letters." });
    }

    // Check if name is "valid" (not just random characters)
    if (name.length < 2 || name.length > 20 || !isValidName(name)) {
        return res.status(400).json({ error: "Please enter a valid name. It should not be too short or too long, and should resemble a real name." });
    }

    try {
        // Calculate Numerology Number
        const numerologyNumber = calculateNumerology(birthdate);

        // Generate Detailed Predictions
        const predictions = getDetailedPredictions(numerologyNumber);

        // Save User Data
        const newUser = new User({
            name,
            birthdate,
            numerologyNumber,
            predictions,
        });
        await newUser.save();

        // Send Response with Predictions
        res.status(201).json({
            message: "User data saved successfully!",
            predictions,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Helper Function to Validate the Name (It should be a valid name)
function isValidName(name) {
    // For simplicity, we assume that a valid name contains at least one vowel
    const vowels = /[aeiouAEIOU]/;
    return vowels.test(name);
}

// Helper Function to Calculate Numerology Number
function calculateNumerology(birthdate) {
    const digits = birthdate.split("-").join("").split("");
    let sum = digits.reduce((acc, num) => acc + parseInt(num), 0);

    // Reduce to a single digit (except 11, 22, 33 for master numbers)
    while (sum > 9 && ![11, 22, 33].includes(sum)) {
        sum = sum
            .toString()
            .split("")
            .reduce((acc, num) => acc + parseInt(num), 0);
    }

    return sum;
}

// Helper Function to Generate Detailed Predictions
function getDetailedPredictions(numerologyNumber) {
    const predictions = {
        1: {
            characteristics: "Independent, ambitious, and a natural leader.",
            qualitiesWeaknesses: "Strengths: Determined and innovative. Weaknesses: Can be overbearing and self-centered.",
            successFields: "Great in leadership roles like entrepreneurship, management, or politics.",
            love: "In 2025, you may find yourself focusing on personal growth. Relationships may feel intense but rewarding.",
            career: "Career growth could involve taking charge of new initiatives or leading projects in the workplace.",
            health: "Focus on maintaining a balanced lifestyle, especially in managing stress levels.",
        },
        2: {
            characteristics: "Diplomatic, sensitive, and cooperative.",
            qualitiesWeaknesses: "Strengths: Empathetic and nurturing. Weaknesses: Overly dependent and hesitant.",
            successFields: "Thrives in teamwork, counseling, or creative arts.",
            love: "2025 may bring harmony and emotional fulfillment in relationships, but ensure clear communication.",
            career: "Collaborative roles could be especially rewarding, but avoid becoming overly dependent on others.",
            health: "Consider focusing on emotional well-being and managing stress, as it may impact your overall health.",
        },
        3: {
            characteristics: "Creative, communicative, and expressive.",
            qualitiesWeaknesses: "Strengths: Optimistic and artistic. Weaknesses: Can be scattered or shallow.",
            successFields: "Success in fields like writing, art, entertainment, or public speaking.",
            love: "Expect romantic opportunities in 2025. A year of emotional growth and creative bonding with partners.",
            career: "Your creativity will shine in your career this year. Be open to new artistic collaborations.",
            health: "Keep a balance between mental stimulation and relaxation to avoid burnout.",
        },
        4: {
            characteristics: "Practical, reliable, and hardworking.",
            qualitiesWeaknesses: "Strengths: Detail-oriented and disciplined. Weaknesses: Can be overly rigid and stubborn.",
            successFields: "Best suited for structured roles such as engineering, accounting, or project management.",
            love: "2025 will focus on building solid, long-term relationships. Patience will be key.",
            career: "Expect steady growth in your career. Hard work will be recognized, but avoid being too controlling.",
            health: "Your health will benefit from a solid routine. Stay active and maintain a strong work-life balance.",
        },
        5: {
            characteristics: "Adventurous, curious, and adaptable.",
            qualitiesWeaknesses: "Strengths: Energetic and versatile. Weaknesses: Can be restless and prone to instability.",
            successFields: "Works best in dynamic fields like travel, journalism, or sales.",
            love: "In 2025, expect a whirlwind romance or exciting new connections. Flexibility will be important in relationships.",
            career: "Career opportunities may be fast-paced. Be open to change and seize new adventures.",
            health: "Avoid overindulgence in physical or mental stress. Take breaks to rejuvenate.",
        },
        6: {
            characteristics: "Nurturing, responsible, and protective.",
            qualitiesWeaknesses: "Strengths: Caring and loyal. Weaknesses: Can be overly self-sacrificing and controlling.",
            successFields: "Great in healthcare, teaching, and any role involving family or community service.",
            love: "2025 will bring emotional fulfillment in relationships. Your nurturing nature will deepen connections.",
            career: "Expect recognition for your efforts in service-oriented roles. A fulfilling year in your career.",
            health: "Focus on self-care, as you may tend to put others’ needs before your own.",
        },
        7: {
            characteristics: "Intuitive, analytical, and introspective.",
            qualitiesWeaknesses: "Strengths: Deep thinker and spiritual. Weaknesses: Can be overly withdrawn and skeptical.",
            successFields: "Ideal in research, science, psychology, or spiritual counseling.",
            love: "In 2025, you may find yourself seeking deeper emotional connections. Spirituality may enhance your relationships.",
            career: "Expect success in analytical or research-oriented careers. Trust your intuition in career decisions.",
            health: "Physical health may require attention. Focus on mental clarity and emotional healing.",
        },
        8: {
            characteristics: "Powerful, ambitious, and authoritative.",
            qualitiesWeaknesses: "Strengths: Strong-willed and goal-oriented. Weaknesses: Can be controlling or materialistic.",
            successFields: "Ideal for leadership roles, business, finance, or law.",
            love: "2025 will bring opportunities to build solid partnerships, but balance work and love life.",
            career: "Expect career success through assertiveness and determination. Be cautious of burnout from overwork.",
            health: "Monitor stress levels and practice mindfulness to maintain health amidst your busy schedule.",
        },
        9: {
            characteristics: "Compassionate, humanitarian, and idealistic.",
            qualitiesWeaknesses: "Strengths: Generous and empathetic. Weaknesses: Can be overly idealistic or emotionally drained.",
            successFields: "Works well in charitable organizations, social work, or any role helping others.",
            love: "2025 will be a year of emotional growth. You may find deeper meaning in your relationships.",
            career: "You may feel a pull towards socially impactful careers. Align your work with your core values.",
            health: "Your health will benefit from a focus on emotional well-being and helping others.",
        },
        11: {
            characteristics: "Visionary, spiritual, and intuitive (Master Number).",
            qualitiesWeaknesses: "Strengths: Highly intuitive and spiritually aware. Weaknesses: Can be overwhelmed by their own sensitivity.",
            successFields: "Great in spiritual or creative fields, teaching, and counseling.",
            love: "In 2025, you may find profound spiritual connections in your relationships. Seek mutual growth.",
            career: "You may be drawn to a higher purpose in your career. Trust your instincts in guiding your path.",
            health: "Focus on grounding yourself and managing emotional sensitivities.",
        },
        22: {
            characteristics: "Master builder, practical, and visionary.",
            qualitiesWeaknesses: "Strengths: Exceptional leadership skills and vision. Weaknesses: Can be too focused on material goals.",
            successFields: "Best suited for roles in business, architecture, or large-scale planning.",
            love: "2025 could bring challenges in relationships as you juggle your ambitious goals. Balance is key.",
            career: "Expect significant achievements in your career, but take care not to sacrifice personal well-being.",
            health: "A solid routine will keep you healthy. Avoid neglecting rest and self-care.",
        },
        33: {
            characteristics: "Compassionate, nurturing, and self-sacrificing (Master Number).",
            qualitiesWeaknesses: "Strengths: Deeply empathetic and helpful. Weaknesses: Can become overwhelmed by others' needs.",
            successFields: "Ideal for teaching, healing, and roles that involve significant service to humanity.",
            love: "2025 will be a year of deep emotional and spiritual connections. Relationships will be transformative.",
            career: "Your work will revolve around serving others. Be cautious of burnout, and remember to prioritize yourself.",
            health: "Taking care of your mental and emotional health will be essential this year.",
        },
    };

    return predictions[numerologyNumber] || {
        characteristics: "Unique and undefined.",
        qualitiesWeaknesses: "Special qualities yet to be uncovered.",
        successFields: "Explore various paths to find your calling.",
        love: "2025 could be a year of self-discovery in love.",
        career: "New opportunities may come, but it will require flexibility and adaptability.",
        health: "Focus on taking care of both your physical and emotional health.",
    };
}

module.exports = router;
