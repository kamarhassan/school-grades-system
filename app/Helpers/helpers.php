<?php
function currentAcademicYearId()
{
    return DB::table('academic_years')
        ->where('is_current',1)
        ->value('id');
}