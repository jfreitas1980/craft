function SetCheckedStates(field, fieldhidden, strue, sfalse)
{
    with (field)
    {
        if (checked) {
            fieldhidden.value = strue
        } else {
            fieldhidden.value = sfalse
        }
    }
}