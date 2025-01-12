document.getElementById("numerologyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const birthdate = document.getElementById("birthdate").value;

    try {
        const response = await fetch("https://numerologyveracity.onrender.com/api/numerology", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, birthdate }),
        });

        const result = await response.json();

        if (response.ok) {
            const { characteristics, qualitiesWeaknesses, successFields, love, career, health } = result.predictions;

            document.getElementById("result").innerHTML = `
                <h3>Your Numerology Insights</h3>
                <p><strong>Characteristics and Personality:</strong> ${characteristics}</p>
                <p><strong>Strengths and Weaknesses:</strong> ${qualitiesWeaknesses}</p>
                <p><strong>Fields for Success in the future:</strong> ${successFields}</p>
                <p><strong>Love Prediction for 2025:</strong> ${love}</p>
                <p><strong>Career Prediction for 2025:</strong> ${career}</p>
                <p><strong>Health Prediction for 2025:</strong> ${health}</p>
            `;
        } else {
            document.getElementById("result").innerHTML = `
                <p style="color: red;">Error: ${result.error || "Something went wrong!"}</p>
            `;
        }
    } catch (error) {
        document.getElementById("result").innerHTML = `
            <p style="color: red;">Error: ${error.message}</p>
        `;
    }
});
