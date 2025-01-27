
        let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

        function renderPasswords() {
            const passwordList = document.getElementById('passwordList');
            passwordList.innerHTML = '';

            passwords.forEach((entry, index) => {
                const row = `
                    <tr>
                        <td>${entry.website}</td>
                        <td>${entry.username}</td>
                        <td>********</td>
                        <td>
                            <button class="copy-btn" onclick="copyPassword(${index})">Copy</button>
                            <button class="delete-btn" onclick="deletePassword(${index})">Delete</button>
                        </td>
                    </tr>
                `;
                passwordList.innerHTML += row;
            });

            localStorage.setItem('passwords', JSON.stringify(passwords));
        }

        function addPassword() {
            const website = document.getElementById('websiteInput').value;
            const username = document.getElementById('usernameInput').value;
            const password = document.getElementById('passwordInput').value;

            if (website && username && password) {
                passwords.push({ website, username, password });
                renderPasswords();

                document.getElementById('websiteInput').value = '';
                document.getElementById('usernameInput').value = '';
                document.getElementById('passwordInput').value = '';
            } else {
                alert('Please fill in all fields');
            }
        }

        function copyPassword(index) {
            const password = passwords[index].password;
            
            // Use Clipboard API
            navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }

        function deletePassword(index) {
            passwords.splice(index, 1);
            renderPasswords();
        }
        renderPasswords();
    