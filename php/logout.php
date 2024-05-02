<?php
// При выходе из аккаунта
session_start();
session_unset();
session_destroy();
echo "success";