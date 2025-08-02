export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;
  if(callback) {
    callback(data);
}
}


export async function loadTemplate(url) {

    const response = await fetch(url);
    const template = await response.text();
    return template;
}






export default async function loadHeaderFooter(headerSelector, footerSelector) {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");
  const headerElement = document.querySelector("#header");
  const footerElement = document.querySelector("#footer");
  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  } else {
    console.error(`Header element not found for selector: ${headerSelector}`);
  }
  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  } else {
    console.error(`Footer element not found for selector: ${footerSelector}`);
  }
  
  return (headerElement && footerElement); 

}