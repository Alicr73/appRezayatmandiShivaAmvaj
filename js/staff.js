console.log("staff page opened");


var socket = io();
var buttonAddStaff = document.getElementById("staffadd");
var inputFullName = document.getElementById('staffInputFullName');
var inputPosition = document.getElementById('staffInputPosition');
var divListStaff = document.getElementById('addstaffDivListStaff');
var buttonAddStaffDone = document.getElementById('staffButtonAddStaffDone');
var fullNamePopUp = document.getElementById('StafffullNamepopUpForm');
var positionPopUp = document.getElementById('StaffPositionpopUpForm');
var employeeId = document.getElementById('StaffemployeeId');
var StaffDayPercent = document.getElementById('StaffDayPercent');
var StaffMonthPercent = document.getElementById('StaffMonthPercent');
var StaffYearPercent = document.getElementById('StaffYearPercent');





socket.emit('listStaff');

        buttonAddStaff.addEventListener('click',function () {
            console.log('add clicked');
            clearText();
            staffaddform.style.display = 'block';
          //  makeNewStaff();
        });
        buttonAddStaffDone.addEventListener('click',function () {
            console.log('salam az addd staff '+inputFullName.value);
            if (inputFullName.value.trim() == ''||inputPosition.value.trim() ==''){
                alert('نام و نام خانوادگی یا سمت را صحیح وارد نکرده اید');
            }else {
                socket.emit('findStaff',inputFullName.value.trim());
            }
        });

        socket.on('staffTekrariCheck',(mojood)=>{

            if (mojood){
                alert('کاربر تکراری است');
                return;
            } else {
                socket.emit('addStaff',inputFullName.value.trim(),inputPosition.value.trim());
                staffaddform.style.display = 'none';
            }

        });

        function clearText() {
            inputPosition.value = '';
            inputFullName.value = '';
        }
        socket.on('showListUser',(list)=>{
          console.log('salam azizam'+list.length);
            for (var i = 0; i < list.length; i++) {
              makeNewStaff(list[i].fullName,list[i].position,list[i].staffID)
            }
        });
        socket.on('showUserDetailPopUp',(user)=>{
            fullNamePopUp.innerHTML = user.fullName;
            positionPopUp.innerHTML = user.position;
            employeeId.innerHTML = user.staffID;
            StaffDayPercent.innerHTML  = user.customerVoteDayPercent + '%';
            StaffMonthPercent.innerHTML = user.customerVoteMounthPercent + '%';
            StaffYearPercent.innerHTML = user.customerVoteYearPercent + '%';
            modal.style.display = 'block';
        });

        function makeNewStaff(name,position,_idJadid) {

            var staffManiDiv = document.createElement("div");
            staffManiDiv.classList.add("col-lg-3");
            var card = document.createElement("div");
            card.classList.add("card")
            staffManiDiv.appendChild(card);
            var card_header = document.createElement("div");
            card_header.classList.add("card-header");
            card.appendChild(card_header);
            var card_icon = document.createElement("div");
            card_icon.classList.add("card-icon");
            card_header.appendChild(card_icon);

            var i = document.createElement("i");
            i.classList.add("fas");
            i.classList.add("fa-user-tie");
            card_icon.appendChild(i);

            var staffNameElement = document.createElement("p");
            staffNameElement.classList.add("card-category");
            staffNameElement.innerHTML = name;
            card_header.appendChild(staffNameElement);

            var staffposition = document.createElement("h3");
            staffposition.classList.add("card-title");
            staffposition.innerHTML = position;
            card_header.appendChild(staffposition);


            var cardFooter = document.createElement("div");
            cardFooter.classList.add("card-footer");
            var stats = document.createElement("div");
            stats.classList.add("stats");
            cardFooter.appendChild(stats);

            var istats = document.createElement("i");
            istats.classList.add("far");
            istats.classList.add("fa-caret-square-down");
            stats.appendChild(istats);

            var showMore = document.createElement("a");
            showMore.innerHTML = "...جزییات بیشتر";
            showMore.id = _idJadid;
            showMore.addEventListener('click',function () {
                socket.emit('searchStaff',_idJadid);

            });
            stats.appendChild(showMore);


            card.appendChild(cardFooter);

            staffManiDiv.appendChild(card);
            divListStaff.appendChild(staffManiDiv);
        }