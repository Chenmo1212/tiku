export var lang_c_1_unit9 = [{"options":["i=10,sum=9","i=9,sum=9","i=2,sum=1","运行出现错误"],"question":"列程序运行的情况是_____。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;int&nbsp;i=1,sum=0;<br/>&nbsp;while(i<10)&nbsp;<br/>&nbsp;sum=sum+1;<br/>&nbsp;i++;<br/>&nbsp;printf(\"i=%d,sum=%d\",i,sum);<br/>&nbsp;}<br/>","answer":3,"type":0},{"options":["x=4","x=8","x=6","x=12"],"question":"下列程序的输出为_____。<br/>&nbsp;#include\"stdio.h\"<br/>&nbsp;main()<br/>&nbsp;{&nbsp;int&nbsp;i,j,x=0;<br/>&nbsp;for(i=0;i<2;i++)<br/>&nbsp;{&nbsp;x++;<br/>&nbsp;for(j＝0;j<=3;j++)<br/>&nbsp;{&nbsp;if(j%2)&nbsp;continue;<br/>&nbsp;x++;&nbsp;<br/>&nbsp;}<br/>&nbsp;x++;<br/>&nbsp;}<br/>&nbsp;printf(\"x=%d\\n\",x);<br/>&nbsp;}<br/>","answer":1,"type":0},{"options":["20","24","25","30"],"question":"若i,j已定义为int类型，则以下程序段中内循环的总的执行次数是_____。<br/>&nbsp;for&nbsp;(i=5；i；i--)<br/>&nbsp;for&nbsp;(j=0；j<4；j++)<br/>&nbsp;{…}<br/>","answer":0,"type":0},{"options":["x=4,y=4,a=1","x=5,y=5,a=1","x=5,y=4,a=3","x=5,y=4,a=1"],"question":"下面程序的输出结果是_____。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;x=3,y=6,a=0;<br/>&nbsp;while&nbsp;(x++!=(y-=1))<br/>&nbsp;{<br/>&nbsp;a+=1;<br/>&nbsp;if&nbsp;(y&ltx)&nbsp;break;<br/>&nbsp;}<br/>&nbsp;printf(\"x=%d,y=%d,a=%d\\n\",x,y,a);<br/>}<br/>","answer":3,"type":0},{"options":["for(i=1;&nbsp;;i++)&nbsp;{sum+=i;if(i==100)break;}","for(i=1;i&lt=100;){sum+=i;i++;}","i=1;for(;i&lt=100;)sum+=i;","i=1;for(;&nbsp;;){sum+=i;if(i==100)break;i++;}"],"question":"有以下语句：<br/>&nbsp;i=1;<br/>&nbsp;for(;i&lt=100;i++)&nbsp;sum+=i;<br/>&nbsp;与以上语句序列不等价的有_____。<br/>","answer":2,"type":0},{"options":["循环体将执行一次","循环体将执行两次","循环体将执行无数多次","系统将提示有语法错误"],"question":"当执行以下程序段时_____。&nbsp;<br/>&nbsp;x=-1；<br/>&nbsp;do&nbsp;<br/>&nbsp;{<br/>&nbsp;x=x*x；<br/>&nbsp;}while&nbsp;(!x)；<br/>","answer":0,"type":0},{"options":["-1","1","8","0"],"question":"执行以下程序后输出的结果是_____。<br/>&nbsp;main()<br/>&nbsp;{<br/>&nbsp;int&nbsp;y=10;<br/>&nbsp;do<br/>&nbsp;{<br/>&nbsp;y--;<br/>&nbsp;}while(--y);<br/>&nbsp;printf(\"%d\\n\",y--);<br/>&nbsp;}<br/>","answer":3,"type":0},{"options":["12457810","369","12","12345678910"],"question":"下面程序的运行结果为_____。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;int&nbsp;n;<br/>&nbsp;for(n=1;n&lt=10;n++)<br/>&nbsp;{&nbsp;if(n%3==0)continue;<br/>&nbsp;printf(\"%d\",n);<br/>&nbsp;}<br/>&nbsp;}<br/>","answer":0,"type":0},{"options":["x=4","x=0","x=2","x=3"],"question":"下面程序的运行结果是_____。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;int&nbsp;x,y,z;<br/>&nbsp;x=0;y=z=-1;<br/>&nbsp;x+=-z---y;<br/>&nbsp;printf(\"x=%d\\n\",x);<br/>&nbsp;}<br/>","answer":2,"type":0},{"options":["20","19","10","9"],"question":"标有/**/的语句的执行次数是_____。<br/>&nbsp;int&nbsp;y,i;<br/>&nbsp;for(i=0;i&lt20;i++)<br/>&nbsp;{&nbsp;if(i%2==0)continue;<br/>&nbsp;y+=i;/**/<br/>&nbsp;}<br/>","answer":2,"type":0},{"options":["n=0;&nbsp;&nbsp;&nbsp;do{++n;}while(n&lt=0);","n=0;&nbsp;while(1){n++;}","n=10;&nbsp;&nbsp;while(n);{n--;}","for(n=0,i=1;&nbsp;&nbsp;;i++)n+=i;"],"question":"以下不构成无限循环的语句或语句组是","answer":0,"type":0},{"options":["k=0,m=3","k=0,m=5","k=1,m=3","k=1,m=5"],"question":"下列程序的输出为_____。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;main(&nbsp;)<br/>&nbsp;{&nbsp;int&nbsp;i,j,k=0,m=0;<br/>&nbsp;for(i=0;i&lt2;i++)<br/>&nbsp;{&nbsp;for(j=0;j&lt3;j++)<br/>&nbsp;k++;<br/>&nbsp;k-=j;<br/>&nbsp;}<br/>&nbsp;m=i+j;<br/>&nbsp;printf(\"k=%d,m=%d\\n\",k,m);<br/>&nbsp;}<br/>","answer":1,"type":0},{"options":["0","1","true","非0"],"question":"在C语言中，为了结束由do-while语句构成的循环，while后一对圆括号中表达式的值应为_____。","answer":0,"type":0},{"options":["a=4,b=4","a=4,b=5","a=5,b=4","a=5,b=5"],"question":"下列程序的输出结果是_____。<br/>#include&nbsp;\"stdio.h\"&nbsp;<br/>main()&nbsp;<br/>{&nbsp;<br/>&nbsp;int&nbsp;i,a=0,b=0;&nbsp;<br/>&nbsp;for(i=1;i&lt10;i++)&nbsp;<br/>&nbsp;{&nbsp;if(i%2==0)&nbsp;<br/>&nbsp;{&nbsp;a++;&nbsp;<br/>&nbsp;continue;}&nbsp;<br/>&nbsp;b++;}&nbsp;<br/>&nbsp;printf(\"a=%d,b=%d\",a,b);&nbsp;}&nbsp;<br/>","answer":1,"type":0},{"options":["10192","9876","10990","101091"],"question":"以下程序的输出结果是_____。<br/>&nbsp;main()<br/>&nbsp;{<br/>&nbsp;int&nbsp;x=10,y=10,i;<br/>&nbsp;for(i=0;&nbsp;x&gt8;&nbsp;y=++i)<br/>&nbsp;printf(\"%d%d\",x--,y);<br/>&nbsp;}<br/>","answer":3,"type":0},{"options":["uwxsta","u&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>w&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>x&nbsp;","u&nbsp;<br/>w<br/>xs","u<br/>w<br/>xsta&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"],"question":"下列程序的输出是_____。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;int&nbsp;i;char&nbsp;c;<br/>&nbsp;for(i=0;i&lt=5;i++)<br/>&nbsp;{&nbsp;c=getchar();<br/>&nbsp;putchar(c);<br/>&nbsp;}<br/>&nbsp;}<br/>&nbsp;程序执行时从第一列开始输入以下数据，&ltCR&gt代表换行符。<br/>&nbsp;u&ltCR&gt<br/>&nbsp;w&ltCR&gt<br/>&nbsp;xsta&ltCR&gt<br/>","answer":2,"type":0},{"options":["0,0","0,1","1,1","程序进入无限循环"],"question":"若变量已正确定义，有以下程序段<br/>&nbsp;i=0;&nbsp;<br/>&nbsp;do&nbsp;printf(\"%d,\",i);while(i++);&nbsp;<br/>&nbsp;printf(\"%d\\n\",i);&nbsp;<br/>&nbsp;其输出结果是_____。<br/>","answer":1,"type":0},{"options":["运行程序段后输出0","运行程序段后输出1","程序段中的控制表达式是非法的","程序段执行无限次"],"question":"设有以下程序段<br/>&nbsp;int&nbsp;x=0,s=0;&nbsp;<br/>&nbsp;while(!x!=0)&nbsp;s+=++x;&nbsp;<br/>&nbsp;printf(\"%d\",s);&nbsp;<br/>&nbsp;则_____。<br/>","answer":1,"type":0},{"options":["循环控制表达式的值为0","循环控制表达式的值为1","循环控制表达式不合法","以上说法都不对"],"question":"已知<br/>&nbsp;int&nbsp;t=0;&nbsp;<br/>&nbsp;while&nbsp;(t=1)&nbsp;<br/>&nbsp;{...}&nbsp;<br/>&nbsp;则以下叙述正确的是_____。<br/>","answer":1,"type":0},{"options":["20","31","321","210"],"question":"以下程序的输出结果是_____。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;n=4;<br/>&nbsp;while&nbsp;(n--)<br/>&nbsp;printf(〞%d〞,--n)；<br/>&nbsp;}<br/>","answer":0,"type":0},{"options":["由于do-while循环中循环体语句只能是一条可执行语句,所以循环体内不能使用复合语句","do-while循环由do开始,用while结束,在while(表达式)后面不能写分号","在do-while循环体中,是先执行一次循环,再进行判断","do-while循环中,根据情况可以省略while"],"question":"以下描述中正确的是_____。","answer":2,"type":0},{"options":["409","277","1","91"],"question":"有以下程序<br/>main()&nbsp;<br/>{&nbsp;<br/>&nbsp;int&nbsp;i,s=1;&nbsp;<br/>&nbsp;for&nbsp;(i=1;i&lt50;i++)&nbsp;<br/>&nbsp;if(!(i%5)&&!(i%3))&nbsp;s+=i;&nbsp;<br/>&nbsp;printf(\"%d\\n\",s);<br/>}&nbsp;<br/>程序的输出结果是_____。<br/>","answer":3,"type":0},{"options":["668977","668966","6677877","6688766"],"question":"若程序执行时的输入数据是\"2473\",则下述程序的输出结果是_____。<br/>&nbsp;#include&ltstdio.h&gt&nbsp;void&nbsp;main()&nbsp;<br/>&nbsp;{&nbsp;int&nbsp;cs;&nbsp;<br/>&nbsp;while((cs=getchar())!=’\\n’)<br/>&nbsp;{switch(cs-’2’)&nbsp;<br/>&nbsp;{&nbsp;case&nbsp;0:&nbsp;<br/>&nbsp;case&nbsp;1:putchar(cs+4);&nbsp;<br/>&nbsp;case&nbsp;2:putchar(cs+4);&nbsp;<br/>&nbsp;break;&nbsp;<br/>&nbsp;case&nbsp;3:putchar(cs+3)default:putchar(cs+2);&nbsp;}&nbsp;}&nbsp;}&nbsp;","answer":0,"type":0},{"options":["31","13","10","20"],"question":"以下程序的输出结果是_____。<br/>&nbsp;main()&nbsp;<br/>&nbsp;{&nbsp;int&nbsp;a,i;a=0;&nbsp;<br/>&nbsp;for(i=1;i<5;i++)&nbsp;<br/>&nbsp;{&nbsp;switch(i)&nbsp;<br/>&nbsp;{case&nbsp;0:&nbsp;<br/>&nbsp;case&nbsp;3:a+=2;&nbsp;<br/>&nbsp;case&nbsp;1:&nbsp;<br/>&nbsp;case&nbsp;2:a+=3;&nbsp;<br/>&nbsp;default:a+=5;&nbsp;}&nbsp;<br/>&nbsp;}printf(\"%d\\n\",a);}&nbsp;<br/>","answer":0,"type":0},{"options":["0","1","2","3"],"question":"有以下程序<br/>&nbsp;#include&nbsp;&ltstdio.h&gt<br/>&nbsp;main()&nbsp;<br/>&nbsp;{&nbsp;int&nbsp;i,j,m=55;&nbsp;<br/>&nbsp;for(i=1;i&lt=3;i++)&nbsp;<br/>&nbsp;for(j=3;j&lt=i;j++)m=m%j;&nbsp;<br/>&nbsp;printf(\"%d\\n\",m);&nbsp;<br/>&nbsp;}&nbsp;<br/>&nbsp;程序的运行结果是_____。&nbsp;<br/>","answer":1,"type":0},{"options":["235","0235","02356","2356"],"question":"有以下程序<br/>&nbsp;main()&nbsp;<br/>&nbsp;{int&nbsp;k=5,n=0;&nbsp;<br/>&nbsp;do&nbsp;<br/>&nbsp;{switch(k)&nbsp;<br/>&nbsp;{&nbsp;case&nbsp;1:&nbsp;<br/>&nbsp;case&nbsp;3:&nbsp;n+=1;k--;break;&nbsp;<br/>&nbsp;default:&nbsp;n=0;k--;&nbsp;<br/>&nbsp;case&nbsp;2:&nbsp;<br/>&nbsp;case&nbsp;4:&nbsp;n+=2;k--;break;&nbsp;<br/>&nbsp;}&nbsp;<br/>&nbsp;printf(\"%d\",n);&nbsp;<br/>&nbsp;}whiwhile(k>0&nbsp;&&&nbsp;n<5);&nbsp;<br/>&nbsp;}&nbsp;<br/>&nbsp;程序运行后的输出结果是_____。","answer":0,"type":0},{"options":["987","876","8765","9876"],"question":"有如下程序_____。<br/>&nbsp;main()&nbsp;<br/>&nbsp;{&nbsp;int&nbsp;n=9;&nbsp;<br/>&nbsp;while(n&gt6){n--;&nbsp;printf(\"%d\",n);}&nbsp;}&nbsp;<br/>","answer":1,"type":0},{"options":["2,1","2,2","2,5","5,2"],"question":"有以下程序<br/>&nbsp;main()&nbsp;<br/>&nbsp;{&nbsp;int&nbsp;x=0,y=0,i;&nbsp;<br/>&nbsp;for&nbsp;(i=1;;++i)<br/>&nbsp;{&nbsp;if&nbsp;(i%2==0)&nbsp;{x++;continue;}&nbsp;<br/>&nbsp;if&nbsp;(i%5==0)&nbsp;{y++;break;}&nbsp;}&nbsp;<br/>&nbsp;printf&nbsp;(\"&nbsp;%d,%d\",x,y);&nbsp;}&nbsp;<br/>&nbsp;程序的输出结果是_____。<br/>","answer":0,"type":0},{"options":["7,4,2,","8,7,5,2,","9,7,6,4,","8,5,4,2,"],"question":"有以下程序<br/>&nbsp;#include&nbsp;&ltstdio.h&gt<br/>&nbsp;main()&nbsp;<br/>&nbsp;{&nbsp;int&nbsp;x=8;&nbsp;<br/>&nbsp;for(&nbsp;;&nbsp;x&gt0;&nbsp;x--)&nbsp;<br/>&nbsp;{&nbsp;if(x%3)&nbsp;{printf(\"%d,\",x--);&nbsp;continue;}&nbsp;<br/>&nbsp;printf(\"%d,\",--x);&nbsp;<br/>&nbsp;}&nbsp;<br/>&nbsp;}&nbsp;<br/>&nbsp;程序的运行结果是_____。<br/>","answer":3,"type":0},{"options":["741","963","852","875421"],"question":"有以下程序<br/>#include&nbsp;&ltstdio.h&gt<br/>main0&nbsp;<br/>{&nbsp;int&nbsp;y=9;&nbsp;<br/>&nbsp;for(&nbsp;;&nbsp;y&gt0;y--)&nbsp;<br/>&nbsp;if(y%3==0)&nbsp;printf(\"%d\",--y);&nbsp;<br/>}&nbsp;<br/>程序的运行结果是_____。<br/>","answer":2,"type":0},{"question":"若输入字母C，程序输出结果为________；若输入字符*，程序将________。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;char&nbsp;c1,c2;<br/>&nbsp;c1=getchar();<br/>&nbsp;while(c1&lt97||c1&gt122)<br/>&nbsp;c1=getchar();<br/>&nbsp;c2=c1-32;<br/>&nbsp;printf(\"%c,%c\\n\",c1,c2);<br/>&nbsp;}<br/>","answer":["c C","等待继续输入，直到输入小写字母"],"type":2,"answer_num":2,"img_list":[null,null,null]},{"question":"以下程序运行的结果为________。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;a,b,c,x,y,z;<br/>&nbsp;a=10;b=2;<br/>&nbsp;c=!(a%b);<br/>&nbsp;x=!(a/b);<br/>&nbsp;y=(a&ltb)&&(b&gt=0);<br/>&nbsp;z=(a&ltb)||(b&gt=0);<br/>&nbsp;printf(\"%d,%d,%d,%d\\n\",c,x,y,z);<br/>&nbsp;}<br/>","answer":["1,0,0,1"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"以下程序运行的结果________。&nbsp;<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;i=1,sum=0;<br/>&nbsp;loop:if(i&lt=10)<br/>&nbsp;{&nbsp;sum+=i;<br/>&nbsp;i++;<br/>&nbsp;goto&nbsp;loop;<br/>&nbsp;}<br/>&nbsp;printf(\"sum=%d\\n\",sum);<br/>}<br/>","answer":["sum=55"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"以下程序运行的结果________。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;x=2,y,z;<br/>&nbsp;x*=3+1;<br/>&nbsp;printf(\"%d,\",x++);<br/>&nbsp;x+=y=z=5;<br/>&nbsp;printf(\"%d,\",x);<br/>&nbsp;x=y==z;<br/>&nbsp;printf(\"%d\\n\",x);<br/>}<br/>","answer":["7,14,1"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"以下程序运行的结果________。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;#include&ltmath.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;i,k,m,n=0;<br/>&nbsp;for(m=1;m&lt=10;m+=2)<br/>&nbsp;{&nbsp;if(n%10==0)<br/>&nbsp;printf(\"\\n\");<br/>&nbsp;k=sqrt(m);<br/>&nbsp;for(i=2;i&lt=k;i++)<br/>&nbsp;if(m%i==0)<br/>&nbsp;break;<br/>&nbsp;if(i&gtk)<br/>&nbsp;{&nbsp;printf(\"%2d\",m);<br/>&nbsp;n++;<br/>&nbsp;}<br/>&nbsp;}<br/>}<br/>","answer":["1 3 5 7"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"如果输入‘1’，‘2’，‘3’，‘4’，程序运行输出的是________。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;char&nbsp;c;<br/>&nbsp;int&nbsp;i,k;<br/>&nbsp;k=0;<br/>&nbsp;for(i=0;i&lt4;i++)<br/>&nbsp;{&nbsp;while(1)<br/>&nbsp;{&nbsp;c=getchar();<br/>&nbsp;if(c&gt=’0’&&c&lt=’9’)<br/>&nbsp;break;<br/>&nbsp;}<br/>&nbsp;k=k*10+c-’0’;<br/>&nbsp;}<br/>&nbsp;printf(\"k=%d\\n\",k);<br/>&nbsp;}<br/>","answer":["1234"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"运行以下程序后，如果从键盘上输入china#&lt回车&gt,则输出结果为________。<br/>&nbsp;#include&nbsp;&ltstdio.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;v1=0,v2=0;<br/>&nbsp;char&nbsp;ch;<br/>&nbsp;while&nbsp;((ch=getchar())!=’#’)<br/>&nbsp;switch(ch)<br/>&nbsp;{&nbsp;case&nbsp;’a’:<br/>&nbsp;case&nbsp;’h’:<br/>&nbsp;default:&nbsp;v1++;<br/>&nbsp;case&nbsp;’0’:v2++;<br/>&nbsp;}<br/>&nbsp;printf(\"%d,%d\\n\",v1,v2);<br/>&nbsp;}<br/>","answer":["5,5"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"程序运行结果是_________。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;i;<br/>&nbsp;for(i=1;i+1;i++)<br/>&nbsp;{&nbsp;if(i&gt4)<br/>&nbsp;{&nbsp;printf(\"%d\\t\",i++);<br/>&nbsp;break;<br/>&nbsp;}<br/>&nbsp;printf(\"%d\\t\",i++);<br/>&nbsp;}<br/>&nbsp;}<br/>","answer":["1 3 5"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"以下程序运行的结果是_________。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;a,b;&nbsp;<br/>&nbsp;for(a=1,b=1;a&lt=100;a++)<br/>&nbsp;{&nbsp;if(b&gt=20)<br/>&nbsp;break;<br/>&nbsp;if(b%3==1)<br/>&nbsp;{&nbsp;b+=3;<br/>&nbsp;continue;<br/>&nbsp;}<br/>&nbsp;b-=5;<br/>&nbsp;}<br/>&nbsp;printf(\"%d\\n\",a);<br/>&nbsp;}<br/>","answer":["8"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"以下程序运行的结果是________。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;i=1;<br/>&nbsp;while(i&lt10)<br/>&nbsp;if(++i%3!=1)<br/>&nbsp;continue;<br/>&nbsp;else&nbsp;<br/>&nbsp;printf(\"%d\",i);<br/>&nbsp;}<br/>","answer":["4 7 10"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"程序运行的结果是________。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;n=0;<br/>&nbsp;while(n++<=1)<br/>&nbsp;printf(\"%d\\t\",n);<br/>&nbsp;printf(\"%d\\n\",n);<br/>&nbsp;}<br/>","answer":["1 2 3"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"此程序运行时，输入qwert?程序的运行结果是_________。<br/>#include&ltstdio.h&gt<br/>main()<br/>{&nbsp;<br/>&nbsp;char&nbsp;c;<br/>&nbsp;while((c=getchar())!=’?’)<br/>&nbsp;putchar(++c);<br/>}<br/>","answer":["rxfsu"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"对以下程序：<br/>&nbsp;当输入65&nbsp;14时，其运行结果是_________。<br/>&nbsp;当输入14&nbsp;63时，其运行结果是_________。<br/>&nbsp;当输入25&nbsp;125时，其运行结果时_________。<br/>&nbsp;#includefine&ltstdio.h&gt&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;m,n;<br/>&nbsp;scanf(\"%d%d\",&m,&n);<br/>&nbsp;while(m!=n)<br/>&nbsp;{&nbsp;while(m&gtn)<br/>&nbsp;m-=n;<br/>&nbsp;while(n&gtm)<br/>&nbsp;n-=m;<br/>&nbsp;}<br/>&nbsp;printf(\"m=%d\\n\",m);<br/>&nbsp;}<br/>","answer":["m=1","m=7","m=25"],"type":2,"answer_num":3,"img_list":[null,null,null]},{"question":"求出1000以内的“完全数”。（提示：如果一个数恰好等于它的因子之和（因子包括1，不包括数本身），则称该数为“完全数”。如：6的因子是1，2，3而6=1+2+3，则6是个“完数”）。<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;i,a,m;<br/>&nbsp;for(i=1;i&lt1000;i++)<br/>&nbsp;{&nbsp;for(m=0,a=1;a&lt=i/2;a++)<br/>&nbsp;if(!(i%a))&nbsp;<br/>&nbsp;_________;<br/>&nbsp;if_________)&nbsp;<br/>&nbsp;printf(\"%4d\",i);<br/>&nbsp;}<br/>&nbsp;}<br/>","answer":["m=m+a","m==i"],"type":2,"answer_num":2,"img_list":[null,null,null]},{"question":"“百钱买百鸡问题”：100元钱买100只鸡，公鸡一只5元钱，母鸡一只3元钱，小鸡一元钱三只，求100元钱能买公鸡、母鸡、小鸡各多少只？<br/>#include&ltstdio.h&gt<br/>main()<br/>{&nbsp;<br/>int&nbsp;cocks,hens,chicks;<br/>cocks=0;<br/>while(cocks&lt=19)<br/>&nbsp;{&nbsp;hens=0;<br/>&nbsp;while(hens&lt=33)<br/>&nbsp;{&nbsp;chicks=100.0-cocks-hens;<br/>&nbsp;if(50*cocks+3.0*hens+chicks/3.0==100.0printf(\"%d,%d,%d\\n\",cocks,hens,chicks);<br/>&nbsp;_________;<br/>&nbsp;}<br/>&nbsp;_________;<br/>&nbsp;}<br/>}&nbsp;<br/>","answer":["hens++","cocks++"],"type":2,"answer_num":2,"img_list":[null,null,null]},{"question":"爱因斯坦的阶梯问题：设有一阶梯，每步跨2阶，最后余1阶；每步跨3阶，最后余2阶；每步跨5阶，最后余4阶；每步跨6阶，最后余5阶；只有每步跨7阶时，正好到阶梯顶。求阶梯的个数。<br/>Main()<br/>{&nbsp;<br/>int&nbsp;ladders=7;<br/>&nbsp;while(_________)<br/>&nbsp;ladders+=14;<br/>&nbsp;printf(\"%d\\n\",ladders);<br/>}","answer":["ladders%3!=2||ladders%5!=4||ladders%6!=5"],"type":2,"answer_num":1,"img_list":[null,null,null]},{"question":"下列程序计算平均成绩并统计90分及以上人数。<br/>Main()<br/>{&nbsp;<br/>&nbsp;int&nbsp;n,m;<br/>&nbsp;float&nbsp;grade,average;<br/>&nbsp;average=n=m=_________;<br/>&nbsp;while(_________)<br/>&nbsp;{&nbsp;<br/>&nbsp;scanf(\"%f\",&grade);<br/>&nbsp;if(grade&lt0)break;<br/>&nbsp;n++;<br/>&nbsp;average+=grade;<br/>&nbsp;if(grade&lt90)&nbsp;_________;<br/>&nbsp;m++;<br/>&nbsp;}<br/>&nbsp;if(n)printf(\"%.2f%d\\n\",average/n,m);<br/>&nbsp;}<br/>","answer":["0","1","continue"],"type":2,"answer_num":3,"img_list":[null,null,null]},{"question":"下列程序计算Fibonacci数列：1，1，2，3，5，8，13……的前40项。<br/>&nbsp;Main()<br/>&nbsp;{&nbsp;int&nbsp;n;<br/>&nbsp;long&nbsp;f1,f2;<br/>&nbsp;_________;<br/>&nbsp;for(n=0;&nbsp;n<20;&nbsp;n++)<br/>&nbsp;{&nbsp;printf(\"%12ld%12ld\",f1,f2);<br/>&nbsp;if(n%2)&nbsp;<br/>&nbsp;printf(\"\\n\");<br/>&nbsp;f1+=f2;<br/>&nbsp;_________;<br/>&nbsp;}<br/>&nbsp;}","answer":["f1=1;f2=1","f2+=f1"],"type":2,"answer_num":2,"img_list":[null,null,null]},{"question":"下列程序判断一个数是否为素数。<br/>&nbsp;#include&ltstdio.h&gt<br/>&nbsp;#include&ltmath.h&gt<br/>&nbsp;main()<br/>&nbsp;{&nbsp;<br/>&nbsp;int&nbsp;I,k,m;<br/>&nbsp;scanf(\"%d\",&m);<br/>&nbsp;k=sqrt(_________);<br/>&nbsp;for(i=2;i&lt=k;i++)<br/>&nbsp;if(m%i==0)&nbsp;_________;<br/>&nbsp;if(_________)<br/>&nbsp;printf(\"%dyes\\n\",m);<br/>&nbsp;else&nbsp;<br/>&nbsp;printf(\"%dno\\n\",m);<br/>&nbsp;}","answer":["m","break","i>=k+1"],"type":2,"answer_num":3,"img_list":[null,null,null]},{"question":"求100~499之间的所有水仙花数，即各位数字的立方和恰好等于该数本身的数。<br/>Main()<br/>{&nbsp;int&nbsp;I,j,k,m,n;<br/>&nbsp;for(i=1;&nbsp;_________;i++)<br/>&nbsp;for(j=0;j&lt=9;j++)<br/>&nbsp;for(k=0;k&lt=9;k++)<br/>&nbsp;{&nbsp;_________;<br/>&nbsp;n=i*i*i+j*j*j+k*k*k;<br/>&nbsp;if(_________)<br/>&nbsp;printf(\"%d\",m);<br/>&nbsp;}<br/>}&nbsp;<br/>","answer":["i<=4","m=i*100+j*10+k","m==n"],"type":2,"answer_num":3,"img_list":[null,null,null]}]