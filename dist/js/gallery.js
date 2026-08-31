
fetch('data/projects.json')
.then(res => res.json())
.then(projects => {

  const container = document.getElementById('galleryContainer');

  projects.forEach(project => {

    const card = document.createElement('div');

    card.classList.add('portfolio-item');

    card.innerHTML = `

      <img src="${project.images[0]}">

      <div class="overlay">
        <div>
          <span>${project.category}</span>
          <h3>${project.title}</h3>
        </div>
      </div>

    `;

    card.addEventListener('click',()=>openProject(project));

    container.appendChild(card);

  });

});