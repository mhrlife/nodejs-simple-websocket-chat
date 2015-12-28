<h1>NodeJS simple websocket chat</h1>
<h3> requirements </h3>
this project need NodeJS websocket . 
<pre>
  npm install websocket
</pre>

<h3>Files </h3>

<table>
  <tr>
      <td>index.html</td>
      <td> client side that contains js websocket connection . you can open this file in your browser ( no server needed ) </td>
  </tr>
  <tr>
      <td>jq.js</td>
      <td>JQuery :)  </td>
  </tr>
  <tr>
      <td>node.js</td>
      <td> nodejs server side file . you can compile and run this file with <code> nodejs node.js </code> </td>
  </tr>
</table>

<h3> about node.js file  </h3>

this file have an important array ( <code>_sockets[]</code> ) that contains socket connections .
<code>admin_auth</code> is also an important array too . we store admins user / pass in this array . ( key is username and value is password )
<h3>sockets</h3>
<table>
  <tr>
      <td><code> socket.username </code></td>
      <td>username ( display name ) of user  .</td>
  </tr>
  <tr>
      <td><code>socket.tIndex </code></td>
      <td>socket index in <code>_sockets[]</code> . we use this variable as user id . </td>
  </tr>
  <tr>
      <td><code>socket.isAdmin </code></td>
      <td>check user is admin or not . 0 ( or undefined ) means user is not admin . 1 means user used admin username but server is waiting for password . 2 means user is admin .</td>
  </tr>
  <tr>
      <td><code> socket.adminToken </code></td>
      <td>token of admin authenticate .</td>
  </tr>
  <tr>
      <td><code> socket.kicked </code></td>
      <td>check user were kicked or not . ( 0 ( or undefined ) means false and 1 means true </td>
  </tr>
</table>

<h3> Commands </h3>

users and admins can use /HELP and /USERS commands .
<code>/HELP</code> shows list of available commands . 
<code>/USERS shows</code> list of users ( with their id ) .
admins can also use /KICK [id] command .
<code>/KICK [id]</code> will kick id out ! 

<pre>
SORRY FOR TERRIBLE ENGLISH . 
</pre>

any question ? contact me @ telegram . ( <a href="http://telegram.me/pp2007ws"> @pp2007ws </a> )

