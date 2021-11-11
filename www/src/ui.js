export const initializeRadioGroups = (algName, algType) => {
    if (algName) {
        document.querySelector(`input[name="algName"][value="${algName}"]`).checked = true;
    }
    if (algType) {
        document.querySelector(`input[name="algType"][value="${algType}"]`).checked = true;
    }
    if (algName || algType) {
        showLoading(true);
    }
}

export const showLoading = visible => {
    document.getElementById('loading').style.display = visible ? 'flex' : 'none';
}