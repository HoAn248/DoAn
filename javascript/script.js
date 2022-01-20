//DOMContentLoaded
$(() => {
  // selector đến các thẻ input của form đăng nhập
  let url = "https://6172867761ed900017c40927.mockapi.io/api-register/users";
  let formDangNhap = $('#box-dn');
  let emailDangNhap = $("#Email");
  // console.log(document.querySelector('#Email'))
  let matKhauDangNhap = $("#Pass");
  let error = $('#login-fail');

  // selector đến các thẻ input của form đăng kí
  let boxDk = $('#box-dk');
  let nameDk = $('#name');
  let emailDk = $('#email');
  let passDk = $('#Password');
  let rPassDk = $('#Password1');
  let dateDk = $('#date');
  let gtDk = document.getElementsByName('gt');
  // console.log(gtDk)

  //form đăng nhập
  formDangNhap.submit(e => {
    // bỏ hành vi mặc định của thẻ
    e.preventDefault();
    //gọi hàm xử lý đăng nhập
    xuLyDangNhap(emailDangNhap, matKhauDangNhap);
  })

  // Kiểm tra email có trong API hay không
  async function kiemTraThongTinDangNhap(input) {
    // input = email
    // tạo biến check để kiểm tra email có trong API không
    let check;
    await fetch(url)
      .then(rsp => rsp.json())
      .then(data => {
        // lặp qua từng đối tượng có trong API
        data.forEach(e => {
          // nếu trong API có email = với giá trị trong thẻ input email mà người dùng nhập vào
          if (e.email == input.val().trim()) {
            // gán đối tượng đó cho biến check
            check = e;
            // lúc này biến check sẽ là 1 đối tượng
            // console.log(check)
          }
        })
      })
    // nếu mà biến check nó = undefined, có nghĩa là không có bất kì email nào
    //  trong API = giá trị nhập vào 
    if (check === undefined) {
      // lúc này chúng ta return về là 1
      return 1
    } else {
      // nếu check khác undefined , nghĩa là biến check hiện đang =  1 đối tượng,
      // chúng ta tiến hành return đối tượng về để xử lý phần pass
      return check
    }
  }

  // xử lý quá trình đăng nhập
  async function xuLyDangNhap(email, pass) {
    // kiểm trả email có tồn tại trong API hay k
    // truyền vào hàm kiểm tra thông tin đăng nhập thẻ email
    let user = kiemTraThongTinDangNhap(email);
    // console.log(typeof user)
    let checkUser;
    await user.then(data => {
      checkUser = data;
      // console.log(checkUser)
      if ((checkUser.email === email.val().trim()) && (checkUser.pass === pass.val().trim())) {
        error.text('');
        $('.khung').show();
        $('#home').hide();
        alert('đăng nhập thành công');
      }
      if ((email.val().trim() === '') || (pass.val().trim() === '')) {
        error.text('Vui lòng điển đủ thông tin');
      }
      if ((email.val().trim().length > 0) && (pass.val().trim().length > 0)) {
        if ((checkUser.email !== email.val().trim()) || (checkUser.pass !== pass.val().trim())) {
          error.text('Email hoặc password đã sai.');
        }
      }
    })
  }
  // kiểm tra email
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  // hàm lỗi
  function showError(input, message) {
    // input là thẻ truyền vào, message là thông báo truyền vào
    // lấy thẻ cha của thẻ input
    var parentE = input.parent();
    // từ thẻ cha find (tìm đến) thẻ con là <span> vào tiến hành gắn message cho nó
    parentE.find('span').text(`${message}`);
    // xóa class thanh-cong và thêm class that-bai
    input.removeClass('thanh-cong').addClass('that-bai');
  }
  // hàm thành công
  function showSuccess(input) {
    var parentE = input.parent();
    parentE.find('span').text('');
    input.removeClass('that-bai').addClass('thanh-cong');
  }
  function checkDk(input, gt) {
    // input là 1 mảng
    // dùng Array destructuring để gán các phần tử trong mảng input vào các biến
    let [name, email, pass, rpass, date] = input;

    // check email
    let checkEmail = validateEmail(email.val());
    // console.log(checkEmail)

    // tạo 1 mảng chứa thông tin đăng ký để return về
    let arrayUser = [];

    // lặp qua từng phần tử trong mảng input và xem giá trị có rỗng hay không
    input.forEach(e => {
      if (e.val().trim() == '') {
        // chạy đến hàm showError để hiển thị lỗi
        showError(e, "Vui lòng nhập giá trị");
      }
    })
    //kiểm tra tên hợp lệ không
    if ((name.val().trim().length <= 20) && (name.val().trim().length >= 1)) {
      // gọi hàm showSuccess và truyền thẻ name vào
      showSuccess(name);
      // gán giá trị vào mảng arrayUser[] ở vị trí index thứ 0 
      arrayUser[0] = name.val().trim();
    } else if ((name.val().trim().length > 20)) {
      showError(name, 'Vui lòng nhập tên dưới 20 ký tự');
    }
    //kiểm tra email hợp lệ không
    if ((checkEmail === true)) {
      showSuccess(email);
      arrayUser[1] = email.val().trim();
    } else if ((email.val().trim().length >= 1)) {
      showError(email, 'Email không hợp lệ');
    }
    //kiểm tra password
    if ((pass.val().trim().length <= 15) && (pass.val().trim().length >= 6)) {
      showSuccess(pass);
      arrayUser[2] = pass.val().trim();
    } else if (pass.val().trim().length >= 1) {
      showError(pass, 'Vui lòng nhập password 6-15 ký tự');
    }
    // kiểm tra password nhập lại
    if ((arrayUser[2] === undefined) && (rpass.val().trim().length > 0)) {
      showError(rpass, 'Vui lòng nhập ô password đúng trước');
    } else if (arrayUser[2] === rpass.val().trim()) {
      showSuccess(rpass);
      arrayUser[3] = rpass.val().trim();
    } else if (rpass.val().trim().length >= 1) {
      showError(rpass, 'Mật khẩu nhập lại không đúng');
    }
    // Kiểm tra ngày sinh
    if (date.val().trim() !== '') {
      showSuccess(date);
      arrayUser[4] = date.val().trim();
    }
    // Kiểm tra họ chọn giới tính gì
    let check;
    // lặp qua từng thẻ giới tính
    gt.forEach(e => {
      if (e.checked === true) {
        check = e.value;
      }
    })
    // nếu người dùng đã tích vào 1 trong 3 ô giới tính
    if (check !== undefined) {
      $('#Gt span').text('');
      arrayUser[5] = check;
    } else {
      $('#Gt span').text('Vui lòng chọn giới tính');
    }

    // console.log(arrayUser)
    if (arrayUser.length == 6) {
      return arrayUser;
    }
  }

  // kiểm tra email có tồn tại trong API hay chưa
  async function checkAPI(input) {
    var check;
    await fetch(url)
      .then(rsp => rsp.json())
      .then(data => {
        // console.log(data)
        data.forEach(e => {
          if (e.email === input[1]) {
            check = 2;
          }
        })
      })
    // nếu như email người dùng nhập vào mà không tồn tại trong API
    if (check === undefined) {
      // thì return giá trị là 1
      return 1;
    } else {
      // nếu như email người dùng nhập vào mà có tồn tại trong API
      // thì return giá trị là 2
      return check;
    }
  }
  function setAPI(input) {
    let [name, email, pass, rpass, date, gt] = input;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        pass: `${pass}`,
        date: `${date}`,
        gioiTinh: `${gt}`,
      }),
    })
  }

  //form đăng kí
  boxDk.submit(e => {
    // bỏ hành vi mặc định của thẻ
    e.preventDefault();

    // truyền đối số gồm 1 mảng và 1 biến
    var check = checkDk([nameDk, emailDk, passDk, rPassDk, dateDk], gtDk);
    // console.log(check);

    // nếu biến check trả về khác undefined 
    if (check !== undefined) {
      // gọi hàm checkAPI và truyền vào đối số check, lúc này check sẽ là 1 mảng các giá trị từ thẻ input
      checkAPI(check)
        .then(data => {
          if (data == 2) {
            showError(emailDk, 'Email này đã tồn tại');
          }
          else if ((check[1] !== undefined) && (data === 1)) {
            // gọi hàm set API
            setAPI(check);
            alert('đăng kí thành công');
          }
        })
    }
  })



  //eyes
  // lấy node list gồm 3 thẻ
  let eyes = document.getElementsByName('hide-eye');
  // console.log(eyes)

  eyes.forEach(e => {
    // nếu click vào con mắt đó
    e.onclick = () => {
      // chạy đến thẻ cha đến thuộc type của thẻ
      let parent = e.parentElement.querySelector('input').type;
      // nếu type của thẻ = passsword
      if (parent == 'password') {
        // thì select đến thẻ input rồi chuyển type về text
        e.parentElement.querySelector('input').type = "text";
      } else {
        // nếu type = text
        // thì select đến thẻ input rồi chuyển type về password
        e.parentElement.querySelector('input').type = "password";
      }
    }
  })

  // đăng xuất
  $('#dangxuat').click(e => {
    alert('Bạn đã đăng xuất');
    // $('.khung').hide();
    // $('#home').show();
  })

  //imgs

  let dem = 0
  let imgs = document.getElementById('imgs')
  let arrowL = document.getElementById('ar1')
  let arrowR = document.getElementById('ar2')
  fetch('https://6172867761ed900017c40927.mockapi.io/api-register/images')
    .then(rsp => rsp.json())
    .then(data => {
      // console.log(data)
      // gán chiều dài của mảng ảnh mà chúng ta lấy dc từ API
      let dataLenght = data.length
      // tạo 1 biến để kiểm tra
      let check = true
      // tìm đến thẻ img rồi đến thuộc tính src , thay src của thẻ bằng src tầm hình cuối hình
      imgs.src = data[dataLenght - 1].src 
      // data[2]


      // ví dụ chúng ta có 3 hình, sẽ có 1 mảng là [anh1,anh2,anh3] chiều dài của mảnh là 3.
      // thì index sẽ là [0, 1, 2]

      // lúc này đang là ảnh 3
      // dem =0 ; in ra ảnh index 0 , data[0]
      // lúc này ảnh sẽ đổi thành ảnh 1
      // dem = 1; data[1]
      // lúc này ảnh sẽ đổi thành ảnh 2
      // dem =2; data[2]
      // lúc này ảnh sẽ đổi thành ảnh 3
      // dem = 3
      setInterval(() => {
        for (var i = 0; i < dataLenght; i++) {

          if (i == dem) {
            imgs.src = data[dem].src
            dem++
            if (dem == dataLenght) {
              dem = 0
            }
            break;
          }
        }
      }, 2000)
      
      arrowL.onclick = () => {
        for (var i = 0; i < dataLenght; i++) {
          if (i == dem) {
            if (dem == 0) {
              dem = dataLenght - 1
              imgs.src = data[dem].src
            } else {
              imgs.src = data[i - 1].src
              dem--;
            }
            break;
          }
        }
      }
      arrowR.onclick = () => {
        for (var i = 0; i < dataLenght; i++) {
          if (i == dem) {
            if (dem == dataLenght - 1) {
              dem = 0
              imgs.src = data[dem].src
            } else {
              imgs.src = data[i + 1].src
              dem++;
            }
            break;
          }
        }
      }
    })
})