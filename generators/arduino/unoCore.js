'use strict';

goog.provide('Blockly.Arduino.unoCore');
 
goog.require('Blockly.Arduino');

Blockly.Arduino['arduino_pin_setUnoCorePinMode'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = block.getFieldValue('MODE') || 'INPUT';
  var code = "pinMode(" + arg0 + ", " + arg1 + ");\n";
  return code;
};
 
Blockly.Arduino['arduino_pin_setUnoCoreDigitalOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'LOW';
  var code = "digitalWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};
 
// Blockly.Arduino['arduino_pin_menu_level'] = function(block) {
//   var code = block.getFieldValue('level') || 'LOW';
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };
 
Blockly.Arduino['arduino_pin_setUnoCorePwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};
 
//add by txl
Blockly.Arduino['arduino_pin_setUnoCoreInterfacePwmOutput'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code = "analogWrite(" + arg0 + ", " + arg1 + ");\n";
  return code;
};
 
Blockly.Arduino['arduino_pin_readUnoCoreDigitalPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var level = Blockly.Arduino.valueToCode(block, 'LEVEL', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'HIGH';
 
  var code = "(digitalRead(" + arg0 + ")==" + (level == 'HIGH' ? 1 : 0) + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_pin_readUnoCoreAnalogPin'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || 'A1';
  var code = "analogRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
//add by txl
Blockly.Arduino['arduino_pin_readUnoCoreDigitalPinNum'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '0';
  var code = "digitalRead(" + arg0 + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
// Blockly.Arduino['arduino_pin_setServoOutput'] = function(block) {
//   var arg0 = block.getFieldValue('PIN') || 'A1';
//   var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
 
//   Blockly.Arduino.includes_['include_servo'] = '#include <Servo.h>';
//   Blockly.Arduino.definitions_['definitions_servo' + arg0] = 'Servo servo_' + arg0 + ';';
//   Blockly.Arduino.setups_['setups_servo' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ');';
 
//   var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
//   return code;
// };
 
Blockly.Arduino['arduino_pin_UnoCoreAttachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
  var arg1 = block.getFieldValue('MODE') || 'RISING';
 
  var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
  branch = Blockly.Arduino.addLoopTrap(branch, block.id);
 
  Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
     'void ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';
 
  var code = 'attachInterrupt(digitalPinToInterrupt(' + arg0 + '), ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
  return code;
};
 
Blockly.Arduino['arduino_pin_UnoCoreDetachInterrupt'] = function(block) {
  var arg0 = block.getFieldValue('PIN') || '2';
 
  var code = 'detachInterrupt(digitalPinToInterrupt(' + arg0 + ');\n';
  return code;
};
 
Blockly.Arduino['arduino_serial_unoCoreSerialBegin'] = function(block) {
  var arg0 = block.getFieldValue('VALUE') || '9600';
 
  var code = 'Serial.begin(' + arg0 + ');\n';
  return code;
};
 
// add by txl
Blockly.Arduino['arduino_serial_unoCoreSerialPrint'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var eol = block.getFieldValue('EOL') || 'warp';
  var code = '';
  var type = block.getFieldValue('TYPE') || 'string';
  var eolcode = 'println';
  var isnum = false;
 
  if (arg0 === '""'){
    if (type !== 'string'){
      arg0 = 0;
      isnum = true;
    }
  } else {
    isnum = /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/.test(arg0.slice(1, arg0.length - 1));
    if (isnum) {
      arg0 = parseFloat(arg0.slice(1, arg0.length - 1));
    }
  }
    
  if (eol === 'warp') {
    eolcode = 'println';
  } else {
    eolcode = 'print';
  }
 
  switch(type){
    case 'string':
      if (isnum){
        arg0 = '"' + arg0 + '"';
      }
      code = 'Serial.' + eolcode + '(' + arg0 + ');\n';
      break;
    case 'hex':
      if (!isnum){
        arg0 = 'String(' + arg0 + ').charAt(0)';
      }
      code = 'Serial.' + eolcode + '(' + arg0 + ', HEX);\n';
      break;
    case 'original':
      if(eolcode === 'println'){
        code = 'Serial.write(' + arg0 + ');\nSerial.println();\n';
      }else{
        code = 'Serial.write(' + arg0 + ');\n';
      }
      break;
  }
  return code;
};
 
Blockly.Arduino['arduino_serial_unoCoreSerialAvailable'] = function() {
  var code = 'Serial.available()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_serial_unoCoreIsSerialAvailable'] = function() {
  var code = '(Serial.available()>0)';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
// add by txl in 2021.10.27
Blockly.Arduino['arduino_serial_unoCoreSerialReadData'] = function(block) {
  var type = block.getFieldValue('TYPE') || 'int';
  var code = '';
  if(type === 'int'){
    code = 'Serial.parseInt()';
  }else if(type === 'float'){
    code = 'Serial.parseFloat()';
  }
  // var code = 'Serial.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_data_unoCoreDataMap'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
  var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
  var arg3 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
  var arg4 = Blockly.Arduino.valueToCode(block, 'ARG3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1000;
 
  var code = 'map(' + arg0 + ', ' + arg1 + ', ' + arg2 + ', ' + arg3 + ', ' + arg4 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_data_unoCoreDataConstrain'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = Blockly.Arduino.valueToCode(block, 'ARG0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 1;
  var arg2 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 100;
 
  var code = 'constrain(' + arg0 + ', ' + arg1 + ', ' + arg2 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_data_unoCoreStringConvert'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var arg1 = block.getFieldValue('TYPE') || 'INTEGER';
 
  var code;
 
  switch(arg1) {
    case 'INTEGER':
      code = 'String(' + arg0 + ').toInt()';
      break;
    case 'DECIMAL':
      code = 'String(' + arg0 + ').toFloat()';
      break;
  }
 
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_data_unoCoreNumConvert'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
  var code;
  code = 'String(' + arg0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
 
Blockly.Arduino['arduino_data_unoCoreDataConvertASCIICharacter'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
 
  var code = 'String(char(' + arg0 + '))';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
// Blockly.Arduino['arduino_data_numRetain'] = function(block) {
//   var arg0 = parseFloat(Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0);
//   var arg1 = Blockly.Arduino.valueToCode(block, 'BIT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
//   var data = arg0.toFixed(arg1);
//   var code = 'String(' + data + ')';
//   return [code, Blockly.Arduino.ORDER_ATOMIC];
// };
 
Blockly.Arduino['arduino_data_unoCoreDataConvertASCIINumber'] = function(block) {
  var arg0 = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 'a';
 
  var code = 'toascii(String(' + arg0 + ')[0])';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
 
Blockly.Arduino['arduino_pin_UnoCoreRun'] = function(block) {
  // var motor = (block.getFieldValue('MOTER') || 'Pins.D3,Pins.D5').split(',');
  var motor = block.getFieldValue('MOTOR') || 'M1';
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '255';
  var rotate = block.getFieldValue('ROTATE') || 'CLOCKWISES';
  Blockly.Arduino.includes_['include_motor'] = '#include <UnoCore.h>';
 
  var code = 'UnoCore.motorRun(UnoCore.' + motor + ',UnoCore.' + rotate + ',' + speed + ');\n';
  return code;
};
 
Blockly.Arduino['arduino_pin_UnoCoreBrake'] = function(block) {
  var motor = block.getFieldValue('MOTOR') || 'M1';
  Blockly.Arduino.includes_['include_motor'] = '#include <UnoCore.h>';
 
  var code = 'UnoCore.motorBrake(UnoCore.' + motor + ');\n';
  return code;
};
 
Blockly.Arduino['arduino_pin_UnoCoreStop'] = function(block) {
  var motor = block.getFieldValue('MOTOR') || 'M1';
  Blockly.Arduino.includes_['include_motor'] = '#include <UnoCore.h>';
 
  var code = 'UnoCore.motorStop(UnoCore.' + motor + ');\n';
  return code;
};
 
 
