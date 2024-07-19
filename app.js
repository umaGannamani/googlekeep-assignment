document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const form = document.getElementById('form');
    const notesContainer = document.getElementById('notes');
    const placeholder = document.getElementById('placeholder');
    const searchBar = document.getElementById('search-bar');
    const menuButton = document.getElementById('menu-button');
    const menuDropdown = document.getElementById('menu-dropdown');
    const newNoteButton = document.getElementById('new-note');
    const deleteAllNotesButton = document.getElementById('delete-all-notes');

    const toggleModal = () => {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    };

    const toggleMenu = () => {
        menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
    };

    const addNote = (title, text) => {
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
            <h3>${title}</h3>
            <p>${text}</p>
            <span class="delete-note">&times;</span>
        `;
        notesContainer.appendChild(note);
        placeholder.style.display = 'none';

        note.querySelector('.delete-note').addEventListener('click', () => {
            note.remove();
            if (!notesContainer.hasChildNodes()) {
                placeholder.style.display = 'block';
            }
        });
    };

    const deleteAllNotes = () => {
        notesContainer.innerHTML = '';
        placeholder.style.display = 'block';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('note-title').value;
        const text = document.getElementById('note-text').value;

        if (title || text) {
            addNote(title, text);
            form.reset();
        }
    });

    modalCloseButton.addEventListener('click', toggleModal);

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const notes = document.querySelectorAll('.note');
        notes.forEach(note => {
            const title = note.querySelector('h3').textContent.toLowerCase();
            const text = note.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || text.includes(query)) {
                note.style.display = 'block';
            } else {
                note.style.display = 'none';
            }
        });
    });

    menuButton.addEventListener('click', toggleMenu);

    newNoteButton.addEventListener('click', () => {
        toggleModal();
        toggleMenu();
    });

    deleteAllNotesButton.addEventListener('click', () => {
        deleteAllNotes();
        toggleMenu();
    });

    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !menuDropdown.contains(e.target)) {
            menuDropdown.style.display = 'none';
        }
    });
});
