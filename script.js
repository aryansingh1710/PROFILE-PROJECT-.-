document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const profileInterests = document.getElementById('profile-interests');
    const editName = document.getElementById('edit-name');
    const editBio = document.getElementById('edit-bio');
    const editInterests = document.getElementById('edit-interests');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureUpload = document.getElementById('profile-picture-upload');

    // Function to fetch user data from API
    const fetchUserData = async () => {
        try {
            const response = await fetch('https://api.example.com/user-profile');
            const data = await response.json();
            profileName.textContent = data.name;
            profileBio.textContent = data.bio;
            profileInterests.innerHTML = data.interests.map(interest => `<li>${interest}</li>`).join('');
            profilePicture.src = data.profilePicture || 'profile-placeholder.png';
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Function to update user data via API
    const updateUserData = async () => {
        const updatedData = {
            name: editName.value,
            bio: editBio.value,
            interests: editInterests.value.split(', '),
            profilePicture: profilePicture.src,
        };

        try {
            const response = await fetch('https://api.example.com/user-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            profileName.textContent = data.name;
            profileBio.textContent = data.bio;
            profileInterests.innerHTML = data.interests.map(interest => `<li>${interest}</li>`).join('');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // Event listener for edit button
    editButton.addEventListener('click', () => {
        editName.value = profileName.textContent;
        editBio.value = profileBio.textContent;
        editInterests.value = Array.from(profileInterests.children).map(li => li.textContent).join(', ');

        profileName.hidden = true;
        profileBio.hidden = true;
        profileInterests.hidden = true;
        editButton.hidden = true;

        editName.hidden = false;
        editBio.hidden = false;
        editInterests.hidden = false;
        saveButton.hidden = false;
    });

    // Event listener for save button
    saveButton.addEventListener('click', async () => {
        await updateUserData();

        profileName.hidden = false;
        profileBio.hidden = false;
        profileInterests.hidden = false;
        editButton.hidden = false;

        editName.hidden = true;
        editBio.hidden = true;
        editInterests.hidden = true;
        saveButton.hidden = true;
    });

    // Event listener for profile picture upload
    profilePicture.addEventListener('click', () => {
        profilePictureUpload.click();
    });

    profilePictureUpload.addEventListener('change', (event) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicture.src = e.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Initial fetch of user data
    fetchUserData();
});
