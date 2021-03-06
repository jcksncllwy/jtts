module.exports = {
  "jtts":{
    "scenes":[
      {
        "_id":0,
        "title": "Bus Stop",
        "getChoices":function(history){
          return [
            {
              "_id":0,
              "getText": function(history){
                return "Whew that was close! The police officer believed you when you said you were just waiting for the bus. You are home free. EXIT THE GAME!";
              },
              "getNextScene": function(history){
                return null;
              }
            },
            {
              "_id":1,
              "getText": function(history){
                return "The police officer believed you were going home, but didn't believe that you weren't involved in the incident. He is giving you a citation and you will have to see a probation officer on a specific date. Proceed to CITATION and pick a card.";
              },
              "getNextScene": function(history){
                return 2;
              }
            },
            {
              "_id":2,
              "getText": function(history){
                return "The police officer asked you to identify yourself and he recognized your last name. He knows your brother and thinks he is a troublemaker and that you are too! You are being detained. Proceed to DETENTION and pick any card except blue.";
              },
              "getNextScene": function(history){
                return 3;
              }
            }
          ]
        }
      },
      {
        "_id":1,
        "title": "Citation",
        "getChoices":function(history){
          return [
            {
              "_id":0,
              "getText": function(history){
                return "You showed up for your court date and you have never been in trouble before. You are going home without being put on probation. EXIT the game.";
              },
              "getNextScene": function(history){
                return null;
              }
            },
            {
              "_id":1,
              "getText": function(history){
                return "You forgot to show up to court and because of that you now have a bench warrant. Head straight to DETENTION and pick the blue card.";
              },
              "getNextScene": function(history){
                return 3;
              }
            }
          ]
        }
      },
      {
        "_id":2,
        "title": "Detention",
        "getChoices": function(history){
          var lastStep = history[history.length];
          var scene = lastStep.scene;
          var choice = lastStep.choice;

          var choices = [];
          if(scene._id==1 && choice._id==1){
            choices.push({
              "_id":0,
              "getText": function(history){
                return "You're here because of a BENCH WARRANT: PROCEED TO DETENTION HEARING";
              },
              "getNextScene": function(history){
                return 4;
              }
            })
          } else if((scene._id==2 && choice._id==5) ||
                    (scene._id==3 && choice._id==2)){
            choices.push({
              "_id":1,
              "getText": function(history){
                return "You're here because you are WAITING FOR YOUR DETENTION HEARING: PROCEED TO DETENTION HEARING AND PICK ANY CARD EXCEPT FOR ORANGE. Remember to address the judge as \"Your Honor\"!";
              },
              "getNextScene": function(history){
                return 4;
              }
            });
          } else if(scene._id==6 && choice._id==1){
            choices.push({
              "_id":2,
              "getText": function(history){
                return "You're here because YOU VIOLATED PROBATION: You must complete the rest of your probation time in detention. YOU MUST STAY HERE UNTIL 1 PERSON PASSES YOU, PROCEED TO PROBATION AND PICK THE RED CARD"
              },
              "getNextScene": function(history){
                return 6;
              }
            });
          } else if(scene._id==4 && choice._id==3){
            choices.push({
              "_id":3,
              "getText": function(history){
                return "You're here because you are being DETAINED UNTIL YOUR ADJUDICATION (Trial) HEARING: PROCEED TO ADJUDICATION HEARING AND PICK A CARD";
              },
              "getNextScene": function(history){
                return 7;
              }
            });
          } else if(scene._id==8 && choice._id==1){
            choices.push({
              "_id":4,
              "getText": function(history){
                return "You're here because you were SENT HERE FROM DISPOSITION HEARING OR TO BE DETAINED: YOU MUST STAY HERE UNTIL 3 PEOPLE HAVE PASSED YOU, PROCEED TO PROBATION AND PICK THE RED CARD.";
              },
              "getNextScene": function(history){
                return 6;
              }
            });
          } else {
            choices.push([
              {
                "_id": 5,
                "getText": function(history){
                  return "Too bad for you! Your county doesn't have a Risk Assessment Instrument (RAI). You are waiting for your detention hearing. Pick up the blue card.";
                },
                "getNextScene": function(history){
                  return 3;
                }
              },
              {
                "_id": 6,
                "getText": function(history){
                  return "Your county has a Risk Assessment Instrument (RAI) in place. Proceed to Risk Assessment.";
                },
                "getNextScene": function(history){
                  return 3;
                }
              }
            ]);
          }

          return choices;
        }
      },
      {
        "_id":3,
        "title": "Risk Assessment",
        "getChoices": function(history){
          return [
            {
              "_id":0,
              "getText": function(history){
                return "You scored LOW on the RAI. The probation officer knows you have never been arrested before. After talking to your guardian he realizes that you are a good kid who was at the wrong place at the wrong time. You are being released to your guardian. EXIT THE GAME";
              },
              "getNextScene": function(history){
                return null;
              }
            },
            {
              "_id": 1,
              "getText": function(history){
                return "You scored MEDIUM on the RAI. Last year you were given a citation, didn’t show up for court and ended up on probation. You haven’t been deemed a 'risk to public safety' but you’re not home free. You are being released to an Alternative to Detention Program. PROCEED TO ALTERNATIVE TO DETENTION AND PICK THE ORANGE CARD";
              },
              "getNextScene": function(history){
                return 5;
              }
            },
            {
              "_id": 2,
              "getText": function(history){
                return "You scored HIGH on the RAI. This was a serious crime and with your prior offense history, things don’t look good for you. You will be held until your detention hearing where a judge will determine if you will be released or detained until your adjudication hearing (trial). GO BACK TO DETENTION AND PICK THE BLUE CARD";
              },
              "getNextScene": function(history){
                return 2;
              }
            }
          ]
        }
      },
      {
        "_id":4,
        "title": "Detention Hearing",
        "getChoices": function(history){
          var lastStep = history[history.length];
          var scene = lastStep.scene;
          var choice = lastStep.choice;

          var choices = [
            {
              "_id": 1,
              "getText": function(history){
                return "You finally see the judge. She determines that there is no evidence to support the charges and thinks you were at the wrong place at the wrong time. The Judge is releasing you to your guardian. EXIT THE GAME"
              },
              "getNextScene": function(history){
                return null
              }
            },
            {
              "_id": 2,
              "getText": function(history){
                return "The judge decides to release you to an ALTERNATIVE TO DETENTION program because she feels you need supervision. PROCEED TO ALTERNATIVE TO DETENTION AND PICK THE ORANGE CARD";
              },
              "getNextScene": function(history){
                return 5;
              }
            },
            {
              "_id": 3,
              "getText": function(history){
                return "You finally see the judge. She has decided that you may not show up to your next court appearance. You will stay in detention until your adjudication hearing. HEAD TO DETENTION AND PICK THE BLUE CARD";
              },
              "getNextScene": function(history){
                return 2;
              }
            }
          ];
          if(scene._id != 2 && choice._id != 1){
            choices.push({
              "_id": 0,
              "getText": function(history){
                return "You go before the judge and she believes you forgot about showing up for your court hearing. Your case was going to be dismissed anyway, so you are free to go. EXIT THE GAME!";
              },
              "getNextScene": function(history){
                return null;
              }
            })
          }

          return choices;
        }
      },
      {
        "_id": 5,
        "title": "Alternative to Detention",
        "getChoices": function (history) {
          var lastStep = history[history.length];
          var scene = lastStep.scene;
          var choice = lastStep.choice;

          var choices = [];
          if((scene._id==4 && choice._id==2) ||
             (scene._id==3 && choice._id==1)){
            choices.push({
              "_id": 0,
              "getText": function(history){
                return "You are not too excited about being in a program but the program they sent you to, “Reflect and Strengthen,” is pretty cool. PROCEED TO ADJUDICATION HEARING AND PICK THE ORANGE CARD."
              },
              "getNextScene": function(history){
                return 7;
              }
            });
          } else {
            choices.push([
              {
                "_id": 0,
                "getText": function(history){
                  return "You are not too excited about being in a program but the program they sent you to, “Reflect and Strengthen,” is pretty cool. PROCEED TO ADJUDICATION HEARING AND PICK THE ORANGE CARD."
                },
                "getNextScene": function(history){
                  return 7;
                }
              },
              {
                "_id": 1,
                "getText": function(history){
                  return "You weren’t too happy about having to go to a program but you completed it successfully. PROCEED TO ADJUDICATION HEARING AND PICK A CARD."
                },
                "getNextScene": function(history){
                  return 7;
                }
              }
            ]);
          }
          return choices;
        }
      },
      {
        "_id": 6,
        "title": "Probation",
        "getChoices": function (history) {
          var lastStep = history[history.length];
          var scene = lastStep.scene;
          var choice = lastStep.choice;

          var choices = [];
          if((scene._id==2 && choice._id==2) ||
             (scene._id==2 && choice._id==4)){
            choices.push({
              "_id": 2,
              "getText": function(history){
                return "Your Probation Officer doesn’t want to see you in trouble again. You will be on probation for the next six months. STAY HERE UNTIL 1 PERSON PASSES YOU At this point you have successfully completed your probation. EXIT THE GAME";
              },
              "getNextScene": function(history){
                return null;
              }
            })
          } else {
            choices.push([
              {
                "_id":0,
                "getText": function(history){
                  return "You have been going to school everyday; coming home by curfew; checking in with your Probation Officer; and you’ve been attending your Alternative to Detention placement. You have been doing great and have completed probation. STAY OUT OF TROUBLE AND EXIT THE GAME!";
                },
                "getNextScene": function(history){
                  return null;
                }
              },
              {
                "_id": 1,
                "getText": function(history){
                  return "You VIOLATED PROBATION by skipping school a couple of times last week. Your Probation Officer is not happy. You are going to complete the rest of your probation in detention. GO TO DETENTION AND PICK THE BLUE CARD";
                },
                "getNextScene": function(history){
                  return 2;
                }
              }
            ])
          }
          return choices;
        }
      },
      {
        "_id": 7,
        "title": "Adjudication Hearing",
        "getChoices": function (history) {
          var lastStep = history[history.length];
          var scene = lastStep.scene;
          var choice = lastStep.choice;

          var choices = [];
          if(scene._id == 5 && choice._id == 0){
            choices.push({
              "_id": 0,
              "getText": function(history){
                return "The judge dismisses your case. 'Make sure you don’t get into any more trouble!' EXIT THE GAME";
              },
              "getNextScene": function(history){
                return null;
              }
            });
          } else {
            choices.push([
              {
                "_id": 0,
                "getText": function(history){
                  return "The judge dismisses your case. 'Make sure you don’t get into any more trouble!' EXIT THE GAME";
                },
                "getNextScene": function(history){
                  return null;
                }
              },
              {
                "_id": 1,
                "getText": function(history){
                  return "The District Attorney has presented evidence against you and the judge has found you guilty. Looks like you will stay in detention until your disposition hearing. PROCEED TO DISPOSITION HEARING";
                },
                "getNextScene": function(history){
                  return 8;
                }
              }
            ])
          }

          return choices;
        }
      },
      {
        "_id": 8,
        "title": "Disposition Hearing",
        "getChoices": function(history){
          return [
            {
              "_id": 0,
              "getText": function(history){
                return "Your disposition hearing is finally here. While serious, the judge is going to release you to your guardian with probation that requires you to go to school every day. PROCEED TO PROBATION";
              },
              "getNextScene": function(history){
                return 6;
              }
            },
            {
              "_id": 1,
              "getText": function(history){
                return "You are being DETAINED as punishment for your involvement in the fight. You will spend 30 days in juvenile hall. GO BACK TO DETENTION AND PICK THE BLUE CARD";
              },
              "getNextScene": function(history){
                return 2;
              }
            },
            {
              "_id": 2,
              "getText": function(history){
                return "This is not your first time being in trouble. The judge believes you should be a ward of the court. This means that the court (not your parents or guardian) will make decisions about your well-being for a while. The judge has decided you should go to a group home. You are awaiting placement. YOU MUST REMAIN STANDING UNTIL EVERYONE ELSE HAS COMPLETED THE GAME THEN YOU MAY EXIT THE GAME.";
              },
              "getNextScene": function(history){
                return null;
              }
            },
            {
              "_id": 3,
              "getText": function(history){
                return "You have been in trouble before and the judge is tired of seeing you. She is sending you to a secure correctional facility. PROCEED TO INCARCERATION";
              },
              "getNextScene": function(history){
                return 9;
              }
            }
          ];
        }
      },
      {
        "_id": 9,
        "title": "Incarceration",
        "getChoices": function(history) {
          return [
            {
              "_id": 0,
              "getText": function(history){
                return "YOU ARE BEING INCARCERATED! STAY IN THIS SPOT UNTIL EVERYONE ELSE HAS EXITED THE GAME. You have lost your freedom.";
              },
              "getNextScene": function(history){
                return null;
              }
            }
          ];
        }
      }
    ]
  }
};