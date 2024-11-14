const fetch = require('node-fetch');

// Replace this with your real database logic or a simple in-memory store
let submissions = [];

exports.handler = async function(event, context) {
    try {
        const { studentId } = JSON.parse(event.body);

        // Check if student ID has already been submitted
        const alreadySubmitted = submissions.includes(studentId);

        // If submitted, return a response saying so
        if (alreadySubmitted) {
            return {
                statusCode: 200,
                body: JSON.stringify({ submitted: true })
            };
        }

        // Otherwise, add student ID to the submission list
        submissions.push(studentId);

        // Return a response allowing submission
        return {
            statusCode: 200,
            body: JSON.stringify({ submitted: false })
        };
    } catch (error) {
        console.error('Error checking submission:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error' })
        };
    }
};
