document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("#div-links a");

    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});
