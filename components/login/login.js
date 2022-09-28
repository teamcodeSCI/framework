const url = `https://62d3967dafb0b03fc5b45764.mockapi.io/user`
const getAllData = async() => {
    try {
        const response = await fetch(url);
        const data = await response.json()
        return data
    } catch (e) {
        return e
    }
}
getAllData()
const getDataByName = async(username) => {
    try {
        const data = await getAllData();
        const user = data.filter((e) => {
            return e.username === username
        })
        return user[0]
    } catch (e) {
        return e
    }
}
const login = async(data) => {
    try {
        const { username, password } = data;
        const user = await getDataByName(username.value)
        if (!user) {
            console.log('user not found');
            document.querySelectorAll('.toast')[0].classList.add("show")
            username.style.borderColor = 'var(--bs-red)'
            password.style.borderColor = 'var(--bs-red)'
            return;
        }
        if (username.value !== user.username || password.value !== user.password) {
            document.querySelectorAll('.toast')[0].classList.add("show")
            username.style.borderColor = 'var(--bs-red)'
            password.style.borderColor = 'var(--bs-red)'
            console.log('wrong username or password')
            return;
        }
        localStorage.setItem('username', username.value)
        localStorage.setItem('password', password.value)
        username.style.borderColor = 'var(--bs-green)'
        password.style.borderColor = 'var(--bs-green)'
        document.querySelectorAll('.toast')[0].classList.remove("show")
        if (localStorage.getItem('username') === user.username && localStorage.getItem('password') === user.password) {
            username.style.borderColor = 'var(--bs-green)'
            password.style.borderColor = 'var(--bs-green)'
            document.querySelectorAll('.toast')[0].classList.remove("show")
        }
        return;
    } catch (e) {
        console.log(e);
        return e;
    }
}