//This code is to test the parser 
var test="a+b*(c^d-e)^(f+g*h)-i";
console.log(inputExp);
//Converting expression to Postfix!
function precedence(ch)
{
    switch(ch)
    {
        case '+':
        case '-':
           return 1;
        case '*':
        case '/':
           return 2;
        case '^':
           return 3;
    }
    return -1;
}
//Using the fact that toLowerCase and toUpperCase acts only on letters!
function isCharacter(ch)
{
       var check1 =ch.toUpperCase();
       var check2 =ch.toLowerCase();
       if(check1===check2)
       return 0;
       else
       return 1;
}
function convertToPostfix(exp)
{
    var postfix="";
    var stack=[];
    //console.log(Array.isArray(stack));
    //console.log(stack.length);
    for(var i=0;i<exp.length;i++)
    {
        var c =exp.charAt(i);
        //console.log(c);
        if(isCharacter(c))
         postfix+=c;
        else if(c=='(')
        stack.push(c);
        else if(c==')')
        {
            while(stack.length&&stack[stack.length-1]!='(')
            postfix +=stack.pop();
            if(stack.length&&stack[stack.length-1]!='(')
            return "Invalid expression";
            else
            stack.pop();
        }
        else
        {
            while(stack.length&&precedence(c)<=precedence(stack[stack.length-1]))
            postfix+=stack.pop();
            console.log("operator");
            stack.push(c);
        }

        //console.log(stack);
    }
    while(stack.length)
    {
        postfix+=stack.pop();
    }
    return postfix;
}
//Postfix expression generated
//Creating the parse tree from the Postfix expression
function TreeElement(value)
{
  this.value=value;
  this.leftChild=null;
  this.rightChild=null;
  this.parent=null;
}

function constructParseTree(expo)
{
  var stack=[];
  var t;
  var tRight;
  var tLeft;
 for(var i=0;i<expo.length;i++)
 {
     var c=expo.charAt(i);
     if(isCharacter(c))
     {
       t= new TreeElement(c);
       stack.push(t);
     }
     else
     {
         t=new TreeElement(c);
         t1=stack.pop();
         t2=stack.pop();
         t.rightChild=t1;
         t1.parent=t;
         t.leftChild=t2;
         t2.parent=t;
         stack.push(t);
     }
 }
 t=stack[stack.length-1];
 stack.pop();
 return t;
}
//To check if constructParseTree is working correctly
/******************************************************************************
 * **************************************************************************
 * ************************************************************************
 * **********************************************************************
 * ********************************************************************
 * *****************************************************************
 * ***************************************************************
 * *************************************************************
 * ***********************************************************
 * *********************************************************
 * *******************************************************
 */
var inputExp="";
var button= document.querySelector('.submit');
//console.log(button);
var input= document.querySelector('input');
var body=document.querySelector('body');
//console.log(body.firstChild.nextSibling.nextSibling.nextSibling);
//console.log(input);
var parseContainer=document.querySelector('.parseContainer');
var postFixForm="";
var treeRoot=new TreeElement(0);
var d=25;//Common difference of bacchas
//Calculate final level of a tree
//var counter=0; //Counts the number of times the function disptch is called,for setting distances,made here to have global access!
button.onclick= function(){   
    //console.log(1);
    //console.log(input.value);
    inputExp=input.value;
    //console.log(typeof(inputExp));
    inputExp=inputExp.replace(/ /g,"") // / /g replaces every instance of " " with "" ,had it been /_/g it would have replaced all instances of _
    postFixForm=convertToPostfix(inputExp);
    //console.log(postFixForm);
    treeRoot=constructParseTree(postFixForm);
    //console.log(treeRoot);

    //Wiping out the DOM element for space!!!
    setTimeout(()=> { body.firstChild.nextSibling.nextSibling.nextSibling.remove()},10);
    
   //Carrying out breadth first traversal

   var queue=[];
   queue.push(treeRoot);
   queue[0].level=0;
   while(queue.length!=0)
   {
       if(queue[0]==null)
       ;
       else
       {
           if(queue[0].leftChild!=null) //As in a parse tree,it can have 2 or 0 children only
           {
            queue[0].leftChild.level=queue[0].level+1;
            queue[0].rightChild.level=queue[0].level+1;
           queue.push(queue[0].leftChild);
           queue.push(queue[0].rightChild);
           }
           console.log(queue[0]); 
           console.log(queue[0].level);//Line to replace !
          // counter++;
         dispatch(queue[0]); //Function to implement!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
           queue.shift();
       }
   }
};
//console.log(height);
//Breadth first traversal implemented

/*var a=50; //a is the starting term in the AP
var decrementOfa=15;//Rate at which a decrements
var d=120; //d is the common difference;
var current=0;
var zCounter=1;//z is for vertical offset
var z=0;
function dispatch(treeDesign)
{
  var ele=document.createElement("div");
  parseContainer.appendChild(ele);
  
  ele.innerHTML=treeDesign.value; //For checking purpose HAG DIYA!!!!!!
  ele.style.position="absolute";
  ele.style.height="10%";
  ele.style.width="5%";
  
  //Setting horizontal offset
 if(counter==zCounter)
 {
     ele.style.left=a+"%";
     current=a;
     a-=decrementOfa;
     decrementOfa/=2;
     d/=2;
 }
 else
 {
     current+=d;
   ele.style.left=current+"%";
 }

//Setting vertical offset
if(counter==(2*zCounter-1))
{
    ele.style.top=z+"%";
    z+=20;
    zCounter*=2;
}
else{
    ele.style.top=z+"%";
}

}*/
var y=50;
function dispatch(treeElement)
{
    
  
   //Setting horizontal offset
   if(treeElement==treeRoot)
   {
    var ele=document.createElement("div");
    ele.className="root"
    parseContainer.appendChild(ele);
    ele.style.position="absolute";
    ele.style.height="10%";
    ele.style.width="5%";
    ele.innerHTML=treeElement.value;
    ele.style.textAlign="center";
    

       ele.style.left=y+"%";
       if(treeElement.rightChild!=null)
       {

        var ele1=document.createElement("div");
        ele1.className="active";
        var ele2=document.createElement("div");
        ele2.className="active";
        parseContainer.appendChild(ele1);
        parseContainer.appendChild(ele2);    
      
        ele1.style.position="absolute";
        ele1.style.height="10%";
        ele1.style.width="5%";
        //ele1.innerHTML=treeElement.value;
        ele1.style.textAlign="center";
        ele2.style.position="absolute";
        ele2.style.height="10%";
        ele2.style.width="5%";
        //ele2.innerHTML=treeElement.value;
        ele2.style.textAlign="center";



           ele1.innerHTML=treeElement.rightChild.value;
           ele2.innerHTML=treeElement.leftChild.value;
           var temp=ele.style.left;
           var tempNum=+((temp).substring(0,temp.length-1));
           ele1.style.left=tempNum+d+"%";
           treeElement.rightChild.pos=ele1.style.left;
           ele2.style.left=tempNum-d+"%";
           treeElement.leftChild.pos=ele2.style.left;
           d/=2;
           ele1.style.top=20+"%";
           treeElement.rightChild.verti=ele1.style.top;
           ele2.style.top=20+"%";
           treeElement.leftChild.verti=ele2.style.top;
           treeElement.rightChild.bounder=ele1.getBoundingClientRect();
           treeElement.leftChild.bounder=ele2.getBoundingClientRect();
           addLine(ele.getBoundingClientRect(),treeElement.rightChild.bounder);
           addLine(ele.getBoundingClientRect(),treeElement.leftChild.bounder);
       }
   }
   else{
       //ele.style.left=treeElement.pos;
       //ele.style.top=treeElement.verti;
       if(treeElement.rightChild!=null)
       {
         

        var ele1=document.createElement("div");
        ele1.className="active";
        var ele2=document.createElement("div");
        ele2.className="active";

        parseContainer.appendChild(ele1);
        parseContainer.appendChild(ele2);    
      
        ele1.style.position="absolute";
        ele1.style.height="10%";
        ele1.style.width="5%";
        //ele1.innerHTML=treeElement.value;
        ele1.style.textAlign="center";
        ele2.style.position="absolute";
        ele2.style.height="10%";
        ele2.style.width="5%";
        //ele2.innerHTML=treeElement.value;
        ele2.style.textAlign="center";




           ele1.innerHTML=treeElement.rightChild.value;
           ele2.innerHTML=treeElement.leftChild.value;
           var temp=treeElement.pos;
           var tempNum=+((temp).substring(0,temp.length-1));
           ele1.style.left=tempNum+d+"%";
           treeElement.rightChild.pos=ele1.style.left;
           ele2.style.left=tempNum-d+"%";
           treeElement.leftChild.pos=ele2.style.left;
           d/=2;
           var temp1=treeElement.verti;
           var tempNum1=+((temp1).substring(0,temp1.length-1));
           ele1.style.top=tempNum1+20+"%";
           treeElement.rightChild.verti=ele1.style.top;
           ele2.style.top=tempNum1+20+"%";
           treeElement.leftChild.verti=ele2.style.top;
           treeElement.rightChild.bounder=ele1.getBoundingClientRect();
           treeElement.leftChild.bounder=ele2.getBoundingClientRect();

           addLine(treeElement.bounder,ele1.getBoundingClientRect());
           addLine(treeElement.bounder,ele2.getBoundingClientRect());
       }
   }

}

//svg template added after the container so as the timeout function in the onclick code remains unharmed!!
//Getting co-ordinates with respect to svg
var svg=document.querySelector("svg");
var svgCord=svg.getBoundingClientRect();
function addLine(obj1,obj2)
{
    
    var x1=obj1.x+(obj1.width/2)-svgCord.x;
    var y1=obj1.y+(obj1.height/2)-svgCord.y; 
    var x2=obj2.x+(obj2.width/2)-svgCord.x;
    var y2=obj2.y+(obj2.height/2)-svgCord.y;
    var line=document.createElementNS("http://www.w3.org/2000/svg","line"); //Namespace URLS!
    line.setAttribute("x1",`${x1.toString()}`);
    line.setAttribute("y1",`${y1.toString()}`);
    line.setAttribute("x2",`${x2.toString()}`);
    line.setAttribute("y2",`${y2.toString()}`);
    svg.appendChild(line);
}