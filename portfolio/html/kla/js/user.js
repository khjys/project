$(document).ready(function() {
  $('#joinForm').validate({
    debug: false,
    rules: {
      user_id: {
        required: true,
        rangelength: [4, 16],
        remote: {
          type: "post",
          url: "../dev/auth_user_info.php"
        }
      },
      passwd: {
        required: true,
        rangelength: [4, 16]
      },
      passwd_chk: {
        required: true,
        equalTo: "#passwd"
      },
      user_name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        digits: true
      },
      hp: {
        required: true,
        digits: true
      },
      m_address: {
        required: true
      },
      m_address2: {
        required: true
      }
    },
    messages: {
      user_id: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디는 최소 : {0}자, 최대 : {1}자 입니다.]</span>",
	      remote: " <span style='color: #FF0000'>[이미 등록된 아이디입니다.]</span>"
			},
      passwd: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호는 최소 : {0}자, 최대 : {1}자 입니다.]</span>"
			},
      passwd_chk: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				equalTo: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호가 다릅니다.]</span>"
			},
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이름을 입력해주세요.]</span>"
			},
      email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>",
				email: " <span style='color: #FF0000; z-index: 100;position: relative;'>[형식이 잘못되었습니다.]</span>"
			},
      tel: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[전화번호를 입력해주세요.]</span>",
				digits: " <span style='color: #FF0000; z-index: 100;position: relative;'>[숫자만 입력해주세요.]</span>"
			},
      hp: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[휴대전화를 입력해주세요.]</span>",
				digits: " <span style='color: #FF0000; z-index: 100;position: relative;'>[숫자만 입력해주세요.]</span>"
			},
      m_address: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[주소를 입력해주세요.]</span>"
			},
      m_address2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[상세주소를 입력해주세요.]</span>"
			}
    },
    submitHandler: function(form) {
      var result = true;
      return result;
    }
  });

  $('#modifyForm').validate({
    debug: false,
    rules: {
      passwd: {
        required: true,
        rangelength: [4, 16]
      },
      passwd_chk: {
        required: true,
        equalTo: "#passwd"
      },
      ori_passwd: {
        required: true
      },
      user_name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        digits: true
      },
      hp: {
        required: true,
        digits: true
      },
      m_address: {
        required: true
      },
      m_address2: {
        required: true
      }
    },
    messages: {
      passwd: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호는 최소 : {0}자, 최대 : {1}자 입니다.]</span>"
			},
      passwd_chk: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				equalTo: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호가 다릅니다.]</span>"
			},
      ori_passwd: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[기존비밀번호를 입력해주세요.]</span>"
			},
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이름을 입력해주세요.]</span>"
			},
      email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>",
				email: " <span style='color: #FF0000; z-index: 100;position: relative;'>[형식이 잘못되었습니다.]</span>"
			},
      tel: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[전화번호를 입력해주세요.]</span>",
				digits: " <span style='color: #FF0000; z-index: 100;position: relative;'>[숫자만 입력해주세요.]</span>"
			},
      hp: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[휴대전화를 입력해주세요.]</span>",
				digits: " <span style='color: #FF0000; z-index: 100;position: relative;'>[숫자만 입력해주세요.]</span>"
			},
      m_address: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[주소를 입력해주세요.]</span>"
			},
      m_address2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[상세주소를 입력해주세요.]</span>"
			}
    }
  });
  $('#modifyFormPW').validate({
    debug: false,
    rules: {
      ori_passwd: {
        required: true
      },
      user_name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true,
        digits: true
      },
      hp: {
        required: true,
        digits: true
      },
      m_address: {
        required: true
      },
      m_address2: {
        required: true
      }
    },
    messages: {
      ori_passwd: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[기존비밀번호를 입력해주세요.]</span>"
			},
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이름을 입력해주세요.]</span>"
			},
      email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>",
				email: " <span style='color: #FF0000; z-index: 100;position: relative;'>[형식이 잘못되었습니다.]</span>"
			},
      tel: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[전화번호를 입력해주세요.]</span>",
				digits: " <span style='color: #FF0000; z-index: 100;position: relative;'>[숫자만 입력해주세요.]</span>"
			},
      hp: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[휴대전화를 입력해주세요.]</span>",
				digits: " <span style='color: #FF0000; z-index: 100;position: relative;'>[숫자만 입력해주세요.]</span>"
			},
      m_address: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[주소를 입력해주세요.]</span>"
			},
      m_address2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[상세주소를 입력해주세요.]</span>"
			}
    }
  });

  $('#withdrawalForm').validate({
    debug: false,
    rules: {
      ori_passwd: {
        required: true
      },
      out_content: {
        required: true
      }
    },
    messages: {
      ori_passwd: {
        required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[기존비밀번호를 입력해주세요.]</span>"
      },
      out_content: {
        required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[탈퇴사유를 입력해주세요.]</span>"
      }
    },
    submitHandler: function(form) {
      var result = true;
      result = confirm("정말로 탈퇴하시겠습니까?");
      return result;
    }
  })
});
