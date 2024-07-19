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
    const colorOptions = document.querySelectorAll('.color-option');
    const modalTagsInput = document.getElementById('modal-tags');
    const formTagsInput = document.getElementById('note-tags');

    let selectedColor = '#fff';

    const toggleModal = () => {
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    };

    const toggleMenu = () => {
        menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
    };

    const addNote = (title, text, tags, color) => {
        const note = document.createElement('div');
        note.classList.add('note');
        note.style.backgroundColor = color;

        const tagsHtml = tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        note.innerHTML = `
            <h3>${title}</h3>
            <p>${text}</p>
            <div class="tags">${tagsHtml}</div>
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
        const tagsInput = formTagsInput.value;
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag).slice(0, 9);

        if (title || text) {
            addNote(title, text, tags, selectedColor);
            form.reset();
            selectedColor = '#fff';
        }
    });

    modalCloseButton.addEventListener('click', toggleModal);

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.getAttribute('data-color');
        });
    });

    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const notes = document.querySelectorAll('.note');
        notes.forEach(note => {
            const title = note.querySelector('h3').textContent.toLowerCase();
            const text = note.querySelector('p').textContent.toLowerCase();
            const tags = Array.from(note.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            if (title.includes(query) || text.includes(query) || tags.some(tag => tag.includes(query))) {
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
